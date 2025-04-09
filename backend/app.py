# backend/app.py - Initial setup for Render deployment
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import logging
import os
import json
from dotenv import load_dotenv

# Load environment variables (for API key stored in Render)
load_dotenv() 

# Basic Logging Setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Barak Backend V2")

# --- CORS Configuration ---
# Permissive CORS with allow_credentials=False
origins = ["*"] 
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False, # Important!
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Gemini Configuration ---
# Will read key from Render environment variables/secrets
gemini_api_key = os.getenv("GEMINI_API_KEY")
if not gemini_api_key:
    logger.warning("GEMINI_API_KEY environment variable not found.")
else:
     try:
        genai.configure(api_key=gemini_api_key)
        logger.info("Gemini API Key configured.")
        # Optional: Initialize model here if needed globally
        # model = genai.GenerativeModel('gemini-1.5-flash') 
     except Exception as e:
        logger.error(f"Error configuring Gemini: {e}")

# --- Request Logging Middleware --- (Optional but helpful)
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Incoming Request: {request.method} {request.url.path}")
    try:
         response = await call_next(request)
         logger.info(f"Outgoing Response: {request.method} {request.url.path} - Status: {response.status_code}")
         return response
    except Exception as e:
         logger.error(f"Error during request processing {request.method} {request.url.path}: {e}", exc_info=True)
         # Re-raise to allow FastAPI's exception handling
         raise e 

# --- Health Check Endpoint ---
@app.get("/health", status_code=200)
async def health_check():
    logger.info("Health check endpoint was hit!")
    return {"status": "healthy_backend_v2"}

# --- Chat Endpoint ---
@app.post("/api/chat", status_code=200)
async def chat_endpoint(request: Request):
    logging.info(">>>> Received request for /api/chat <<<<")
    logger.info("Chat endpoint hit.")
    ai_response_text = "Processing your request..." # Default initial message
    parsed_criteria = {} 
    properties_result = []
    smart_tags_result = []

    try:
        # 1. Get User Message
        try:
             body = await request.json()
             user_message = body.get("message", "")
             logger.info(f"Chat endpoint parsed message: {user_message}")
             if not user_message:
                  raise ValueError("Empty message received")
        except (json.JSONDecodeError, ValueError) as e:
             logger.error(f"Failed to parse JSON body or empty message: {e}")
             raise HTTPException(status_code=400, detail=f"Invalid/Empty JSON body: {e}")

        # 2. Call Gemini to Extract Criteria
        if gemini_api_key: # Check if API key is configured
            try:
                logger.info("Attempting Gemini call...")
                model = genai.GenerativeModel('gemini-1.5-flash') 
                
                # Refined prompt asking for JSON output
                prompt = f"""Analyze the following user request for real estate properties. Extract the key criteria and return ONLY a valid JSON object string with the following keys: 'action' (e.g., 'buy', 'rent', 'find'), 'location' (city/area), 'property_type' (e.g., 'apartment', 'house'), 'rooms' (number or range), 'budget' (number or range), 'features' (list of keywords). If a criterion is not mentioned, use null or an empty string/list for its value. User request: '{user_message}'"""
                
                logger.info(f"Sending prompt to Gemini: {prompt}")
                response = await model.generate_content_async(prompt)
                
                # Log raw response safely (handle potential non-text parts if needed)
                try:
                   gemini_raw_response = response.text
                   logger.info(f"Gemini Raw Response Text: {gemini_raw_response}")
                except ValueError as ve:
                    logger.warning(f"Gemini response did not contain valid text: {ve}. Full response: {response.parts}")
                    gemini_raw_response = None # Indicate no usable text response
                    ai_response_text = "Received an unexpected response format from AI."

                # Attempt to parse the response text if it exists
                if gemini_raw_response:
                    try:
                        # Clean potential markdown/fencing if Gemini adds it
                        cleaned_response = gemini_raw_response.strip().strip('```json').strip('```').strip()
                        parsed_criteria = json.loads(cleaned_response)
                        logger.info(f"Successfully parsed Gemini response: {parsed_criteria}")
                        # Generate a user-friendly confirmation message
                        criteria_summary = ", ".join(f"{k}: {v}" for k, v in parsed_criteria.items() if v) # Only show non-empty values
                        ai_response_text = f"Okay, looking for properties based on: {criteria_summary}" if criteria_summary else "Okay, I understood your request. Refining search criteria."

                    except json.JSONDecodeError as json_e:
                        logger.error(f"Failed to parse Gemini JSON response: {json_e}. Raw response was: {gemini_raw_response}")
                        parsed_criteria = {} # Ensure it's reset on error
                        ai_response_text = "I understood your request, but had trouble extracting specific criteria. Could you please rephrase?"
                    except Exception as parse_e: # Catch other potential parsing issues
                        logger.error(f"Unexpected error parsing Gemini response: {parse_e}. Raw response was: {gemini_raw_response}")
                        parsed_criteria = {} 
                        ai_response_text = "Sorry, I encountered an issue processing the details of your request."
                        
            except Exception as gemini_e:
                logger.error(f"Error calling Gemini API: {gemini_e}", exc_info=True)
                parsed_criteria = {} # Ensure criteria is empty on error
                ai_response_text = "Sorry, there was an error communicating with the AI assistant."
        else:
            logger.warning("Gemini API key not configured. Cannot extract criteria.")
            parsed_criteria = {} # Ensure criteria is empty if key missing
            ai_response_text = f"Backend received: '{user_message}' (AI processing disabled - key missing)."

        # --- Action Check & Tag Generation --- 
        tags_list = []
        proceed_with_search = False # Flag to control flow
        clarification_needed = False # Flag for ambiguous action

        # Check if criteria parsing was successful and yielded a dictionary
        if isinstance(parsed_criteria, dict):
            extracted_action = parsed_criteria.get('action')
            logger.info(f"Extracted action: {extracted_action}")

            # Normalize action for checking (convert to lowercase, handle None)
            normalized_action = str(extracted_action).lower().strip() if extracted_action is not None else None

            # Define clear buy/rent actions
            buy_actions = ['buy', 'purchase', 'acheter']
            rent_actions = ['rent', 'lease', 'louer']

            if normalized_action in buy_actions or normalized_action in rent_actions:
                proceed_with_search = True 
                logger.info(f"Action '{normalized_action}' confirmed. Proceeding with tag generation.")
                
                # Generate tags (excluding the action itself)
                for key, value in parsed_criteria.items():
                    if key == 'action': 
                        continue # Skip creating a tag for the action
                    
                    if value is not None and value != '' and value != []:
                        tag_text = None # Initialize tag_text for this iteration
                        
                        # --- Basic French Tag Translation/Formatting ---
                        if key == 'property_type' and isinstance(value, str):
                            if value.lower() == 'apartment': tag_text = 'Appartement'
                            elif value.lower() == 'house': tag_text = 'Maison'
                            else: tag_text = value.capitalize()
                        elif key == 'budget':
                            try: # Format budget with space separator and euro sign
                                budget_float = float(str(value).replace(' ', '').replace('€', ''))
                                tag_text = f"{budget_float:,.0f}€".replace(',', ' ')
                            except (ValueError, TypeError):
                                tag_text = str(value) # Fallback
                        elif key == 'rooms':
                           try: # Format rooms 
                               tag_text = f"{int(value)} pièces"
                           except (ValueError, TypeError):
                                tag_text = str(value) # Fallback
                        elif key == 'features' and isinstance(value, list):
                           for feature in value:
                               if feature and isinstance(feature, str):
                                   tags_list.append({'text': feature.capitalize()})
                           continue # Skip adding the list itself as a tag
                        else: # Default for location or other string types
                             if isinstance(value, str):
                                 tag_text = value.capitalize()
                             else:
                                 tag_text = str(value) # Fallback for non-strings
                        # ---------------------------------------------
                        
                        # Append tag if text was generated
                        if tag_text is not None:
                            tags_list.append({'text': tag_text}) 
                            
                logger.info(f"Generated tags (excluding action): {tags_list}")
                 # Update confirmation message (show only relevant criteria)
                criteria_summary = ", ".join(tag['text'] for tag in tags_list)
                ai_response_text = f"Ok, je cherche : {criteria_summary}." if criteria_summary else f"Ok, je cherche à {normalized_action}. D'autres critères?"

            else:
                # Action is None, empty, or ambiguous (e.g., "find")
                logger.info(f"Action '{normalized_action}' is missing or ambiguous. Setting clarification needed.")
                clarification_needed = True
                # Response text and tags are handled below based on this flag
        else:
             logger.warning("Parsed criteria is not a dictionary. Cannot check action or generate tags.")
             clarification_needed = True # Treat parsing failure as needing clarification
        
        # --- Set final response based on flags --- 
        if clarification_needed:
            ai_response_text = "Compris. Vous cherchez à acheter ou à louer?" # Updated French question
            smart_tags_result = [] # Ensure no tags are sent
            proceed_with_search = False # Ensure no search happens
            logger.info("Clarification needed, returning question to user.")
        else:
             # ai_response_text and tags_list were set correctly above if action was valid
            smart_tags_result = tags_list
            logger.info(f"Action valid, returning AI message: '{ai_response_text}' and tags: {smart_tags_result}")
        
        # 4. TODO: Call Firecrawl using parsed_criteria (Only if proceed_with_search is True)
        properties_result = [] # Default to empty list
        if proceed_with_search:
            logger.info("Proceeding to Firecrawl (TODO)...")
            # properties_result = call_firecrawl(parsed_criteria)
        else:
            logger.info("Skipping Firecrawl call due to missing/ambiguous action or error.")
        # logger.info(f"Firecrawl Results (TODO): {properties_result}") # Log removed as it's always [] for now

        # 5. Format Response
        response_data = { 
            "aiMessage": ai_response_text, 
            "properties": properties_result, 
            "smartTags": smart_tags_result
        }
        logger.info(f"Chat endpoint returning final data: {response_data}")
        return response_data

    except HTTPException as http_e:
         # Re-raise HTTPExceptions (like the 400 from body parsing)
         logger.warning(f"HTTPException in chat endpoint: {http_e.status_code} - {http_e.detail}")
         raise http_e
    except Exception as e:
        logger.error(f"Unexpected error processing /api/chat: {e}", exc_info=True)
        # Return a generic 500 error for other unexpected issues
        raise HTTPException(status_code=500, detail="Internal server error in chat endpoint")

# --- Explicit OPTIONS handler for /api/chat ---
@app.options("/api/chat", status_code=204)
async def options_chat():
     logger.info("OPTIONS request received for /api/chat")
     # Middleware handles adding the actual headers
     return None 