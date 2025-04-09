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
                # Keep parsed_criteria empty
                ai_response_text = "Sorry, there was an error communicating with the AI assistant."
        else:
            logger.warning("Gemini API key not configured. Cannot extract criteria.")
            ai_response_text = f"Backend received: '{user_message}' (AI processing disabled - key missing)."

        # 3. TODO: Generate Smart Tags based on parsed_criteria
        # smart_tags_result = generate_tags(parsed_criteria)
        logger.info(f"Generated Smart Tags (TODO): {smart_tags_result}")

        # 4. TODO: Call Firecrawl using parsed_criteria
        # properties_result = call_firecrawl(parsed_criteria)
        logger.info(f"Firecrawl Results (TODO): {properties_result}")

        # 5. Format Response
        response_data = { 
            "aiMessage": ai_response_text, 
            # Include parsed criteria in response for debugging/potential FE use?
            # "extractedCriteria": parsed_criteria, 
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