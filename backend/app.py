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
    logger.info("Chat endpoint hit.")
    ai_response_text = "Backend received message, AI logic not fully implemented yet." 
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

        # 2. Call Gemini (Basic structure - refine prompt/parsing later)
        if genai.api_key:
            try:
                logger.info("Attempting Gemini call...")
                model = genai.GenerativeModel('gemini-1.5-flash') 
                # TODO: Refine this prompt significantly for better extraction
                prompt = f"Parse this property search query and return criteria as JSON (keys: action, location, property_type, rooms, budget, features): '{user_message}'"
                response = await model.generate_content_async(prompt)
                gemini_raw_response = response.text
                logger.info(f"Gemini Raw Response: {gemini_raw_response}")
                # TODO: Implement robust parsing of Gemini response into parsed_criteria dict
                # TODO: Handle potential Gemini errors/safety blocks
                ai_response_text = f"Received AI Response (needs parsing): {gemini_raw_response}" # Placeholder
            except Exception as gemini_e:
                logger.error(f"Error calling Gemini API: {gemini_e}", exc_info=True)
                ai_response_text = "Error communicating with AI."
        else:
            logger.warning("Gemini API key not configured. Returning basic response.")
            ai_response_text = f"Backend received: {user_message}"

        # 3. TODO: Generate Smart Tags based on parsed_criteria
        # smart_tags_result = generate_tags(parsed_criteria)

        # 4. TODO: Call Firecrawl using parsed_criteria
        # properties_result = call_firecrawl(parsed_criteria)

        # 5. Format Response
        response_data = { 
            "aiMessage": ai_response_text, 
            "properties": properties_result, 
            "smartTags": smart_tags_result 
        }
        logger.info(f"Chat endpoint returning final data.")
        return response_data

    except HTTPException as http_e:
         # Re-raise HTTPExceptions (like the 400 from body parsing)
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