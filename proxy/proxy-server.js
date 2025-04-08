// proxy-server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; // Render uses PORT env var

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Replit backend URL (Your existing FastAPI backend)
const REPLIT_API_URL = 'https://fast-api-backend-rodericandrews.replit.app';

// Health check endpoint for the proxy itself
app.get('/health', async (req, res) => {
  try {
    // Optionally check connection to backend? Or just confirm proxy is running.
    // For now, just confirm proxy is up.
    // const response = await axios.get(`${REPLIT_API_URL}/health`, { timeout: 5000 });
    res.json({ status: 'proxy_healthy' /*, backend_status: response.data.status */ });
  } catch (error) {
    // console.error('Health check failed:', error.message);
    res.status(500).json({ status: 'proxy_healthy_backend_unreachable' });
  }
});

// Proxy for chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    console.log('Received proxy request:', req.body); // Log on proxy server

    const response = await axios.post(`${REPLIT_API_URL}/api/chat`, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 15000 // 15 second timeout
    });

    console.log('Proxy response status from backend:', response.status); // Log on proxy server
    console.log('Proxy response data from backend:', response.data); // Log on proxy server
    res.status(response.status).json(response.data); // Forward backend status and data

  } catch (error) {
    console.error('Proxy request failed:', error.message); // Log on proxy server

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error details from backend:', {
        status: error.response.status,
        data: error.response.data
      });
      // Forward the error status and data from the backend
      res.status(error.response.status).json({
        aiMessage: `Error from backend: ${error.response.status}`,
        error: JSON.stringify(error.response.data)
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from backend');
      res.status(504).json({
        aiMessage: "Le backend n'a pas répondu dans le délai imparti.", // Backend timeout message
        error: "Gateway timeout"
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
      res.status(500).json({
        aiMessage: "Erreur lors de la configuration de la requête proxy.", // Proxy setup error message
        error: error.message
      });
    }
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
}); 