# app.py - Minimal Version for Stability Test
from fastapi import FastAPI
# No uvicorn import needed here if not running via __main__ block

app = FastAPI(title="Barak Backend Stable") # Added a title

@app.get("/health", status_code=200)
async def health_check():
    print("Health check endpoint was hit!") 
    return {"status": "healthy_stable_v2"}

# No other routes, middleware, logging, etc. for this initial setup. 