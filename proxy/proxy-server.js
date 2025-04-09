// proxy-server.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; // Render uses PORT env var

// Target backend URL from environment variable
const TARGET_BACKEND_URL = process.env.TARGET_BACKEND_URL;
if (!TARGET_BACKEND_URL) {
    console.error("FATAL ERROR: TARGET_BACKEND_URL environment variable is not set.");
    // Optional: Exit if the variable is crucial and missing,
    // or set a default that will clearly fail later.
    // process.exit(1); // Uncomment to exit if env var is missing
} else {
    console.log(`Proxy configured to target backend: ${TARGET_BACKEND_URL}`);
}

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Replit backend URL (Your existing FastAPI backend) - **REMOVED/REPLACED**
// const REPLIT_API_URL = 'https://fast-api-backend-rodericandrews.replit.app';

// Health check endpoint for the proxy itself - **MODIFIED**
app.get('/health', async (req, res) => {
  let backendStatus = 'unreachable';
  try {
    if (TARGET_BACKEND_URL) {
        console.log(`[Proxy Health] Checking backend health at ${TARGET_BACKEND_URL}/health`);
        const response = await axios.get(`${TARGET_BACKEND_URL}/health`, { timeout: 5000 });
        if (response.status === 200 && response.data.status) { // Check for status 200 and expected data structure
            backendStatus = response.data.status; // Use backend's reported status
            console.log('[Proxy Health] Backend responded OK:', backendStatus);
        } else {
            console.warn(`[Proxy Health] Backend responded with unexpected status/data: ${response.status}`);
            backendStatus = `unexpected_response_${response.status}`;
        }
    } else {
        console.warn('[Proxy Health] TARGET_BACKEND_URL not set, skipping backend check.');
        backendStatus = 'not_configured';
    }
    res.json({ status: 'proxy_healthy', backend_status: backendStatus });
  } catch (error) {
    console.error('[Proxy Health] Backend health check failed:', error.message);
    // Still return that the proxy itself is healthy, but backend is unreachable
    res.json({ status: 'proxy_healthy', backend_status: 'unreachable' });
  }
});

// Proxy for chat endpoint - **MODIFIED**
app.post('/api/chat', async (req, res) => {
  if (!TARGET_BACKEND_URL) {
      console.error('Cannot proxy /api/chat: TARGET_BACKEND_URL is not set.');
      return res.status(503).json({
          aiMessage: "Proxy configuration error: Target backend URL is not set.",
          error: "Proxy configuration error"
      });
  }

  try {
    console.log('Received proxy request for /api/chat:', req.body);

    const response = await axios.post(`${TARGET_BACKEND_URL}/api/chat`, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 15000 // 15 second timeout
    });

    console.log('Proxy response status from backend:', response.status);
    console.log('Proxy response data from backend:', response.data);
    console.log('Proxy sending back response headers:', res.getHeaders());
    res.status(response.status).json(response.data);

  } catch (error) {
    console.error('Proxy request failed for /api/chat:', error.message);

    if (error.response) {
      console.error('Error details from backend:', {
        status: error.response.status,
        data: error.response.data
      });
      res.status(error.response.status).json({
        aiMessage: `Error from backend: ${error.response.status}`,
        error: JSON.stringify(error.response.data)
      });
    } else if (error.request) {
      console.error('No response received from backend');
      res.status(504).json({
        aiMessage: "Le backend n'a pas répondu dans le délai imparti.",
        error: "Gateway timeout"
      });
    } else {
      console.error('Request setup error:', error.message);
      res.status(500).json({
        aiMessage: "Erreur lors de la configuration de la requête proxy.",
        error: error.message
      });
    }
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
}); 