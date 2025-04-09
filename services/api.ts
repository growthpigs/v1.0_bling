// services/api.ts
import axios from 'axios'; // Import Axios -- KEEPING for test functions

// const API_BASE_URL = 'https://fast-api-backend-rodericandrews.replit.app'; // Old Replit URL
// const API_BASE_URL = 'https://v1-0-bling-barak-proxy.onrender.com'; // Old Render Proxy URL
// const API_BASE_URL = 'https://v2-bling-web-service.onrender.com'; // Old Render Proxy URL
const API_BASE_URL = 'https://v3-0-bling-web-server.onrender.com'; // Final working Render Proxy URL

export interface ChatResponse {
  aiMessage: string;
  properties?: any[]; // Use a more specific type if available (e.g., PropertyData[])
  smartTags?: any[]; // Use a more specific type if available (e.g., TagData[])
  error?: string; // Error field for error handling
}

/**
 * Sends a user message to the chat API and returns the AI's response.
 * Using basic fetch as requested.
 * @param userMessage The message text sent by the user.
 * @returns A promise that resolves with the AI's response object or an error object.
 */
export async function sendChatMessage(userMessage: string): Promise<ChatResponse> {
  
  console.log(`[API] Attempting to send message: "${userMessage}" to proxy: ${API_BASE_URL}`);
  const endpoint = `${API_BASE_URL}/api/chat`;
  const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  };
  const body = JSON.stringify({ message: userMessage });

  // --- Add AbortController for timeout --- 
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
      console.log('[API Timeout] Request timed out, aborting fetch.');
      controller.abort();
  }, 45000); // Changed timeout to 45 seconds (was 15000)
  // --------------------------------------

  try {
    console.log('[API] Executing fetch with timeout...'); // Log before fetch
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: body,
      signal: controller.signal // Pass the AbortSignal to fetch
    });
    
    // Clear the timeout if the fetch completes/errors normally before 15s
    clearTimeout(timeoutId); 
    console.log('[API] Fetch call completed or errored before timeout.'); // Log after fetch attempt

    const responseStatus = response.status;
    console.log(`[API] Received Response Status: ${responseStatus}`);
    const rawText = await response.text();
    console.log(`[API] Received Raw Response Text (len: ${rawText.length}): ${rawText.substring(0, 200)}...`);

    if (!response.ok) {
      console.error(`[API Error] HTTP Error ${responseStatus}`);
      throw new Error(`Network response was not ok (${responseStatus}) - ${rawText.substring(0, 100)}...`);
    }

    let data: ChatResponse;
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      console.error('[API Error] JSON parse error:', e);
      throw new Error(`JSON parse error: ${rawText.substring(0, 100)}...`);
    }

    console.log('[API] Parsed JSON Response:', data);
    console.warn("!!!!!! sendChatMessage: SUCCESS !!!!!");
    return data;

  } catch (error) {
    // Clear the timeout in case the error happened before fetch completed but after timeout was set
    clearTimeout(timeoutId); 
    
    console.warn("!!!!!! sendChatMessage: ERROR !!!!!", error);

    let errorMessage = "Désolé, une erreur réseau ou serveur s'est produite via le proxy.";
    let errorString = String(error);

    if (error instanceof Error) {
        errorString = error.toString(); // Use error.toString() if it's an Error
        if (error.name === 'AbortError') {
            console.error('[API Error] Fetch aborted due to timeout.');
            errorMessage = "Désolé, la requête a pris trop de temps. Veuillez réessayer.";
        } else {
            console.error('[API Error] sendChatMessage failed:', error);
        }
    } else {
        // Handle non-Error types if necessary, or just log the string representation
        console.error('[API Error] sendChatMessage failed with non-Error type:', error);
    }
    
    // Return standard error structure
    return {
      aiMessage: errorMessage,
      error: errorString // Use the derived errorString
    };
  }
  
  // --- Temporary httpbin.org test code (Simplified .then/.catch) --- REMOVED
  /* 
  console.log(`[sendChatMessage] Firing simplified HTTPBin test for: ${userMessage}`);

  fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage })
  })
  .then(response => {
    console.log(`[HTTPBin then] Received response status: ${response.status}`);
    return response.json(); // Attempt to parse JSON
  })
  .then(data => {
    console.log('[HTTPBin Success]', data);
  })
  .catch(error => {
    // This catch block should execute for network errors OR JSON parsing errors
    console.error('[HTTPBin Error - Simplified Catch]', error);
  });
  */
  // --- End of temporary test code ---

  // Return dummy response immediately - REMOVED
  /*
  console.log('[sendChatMessage] Returning dummy response (simplified test).')
  return Promise.resolve({
    aiMessage: "[HTTPBin Test Active] Check console logs (simplified test).",
    error: undefined
  });
  */
}

/**
 * Placeholder function to simulate liking a property.
 * @param propertyId The ID of the property to like.
 */
export async function likeProperty(propertyId: string): Promise<void> {
  console.log(`API Call: Liking property ${propertyId}`);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300)); 
  // In a real app, this would make a network request
  console.log(`API Success: Liked property ${propertyId}`);
  // No return value needed for this example
}

/**
 * Placeholder function to simulate passing on a property.
 * @param propertyId The ID of the property to pass.
 */
export async function passProperty(propertyId: string): Promise<void> {
  console.log(`API Call: Passing property ${propertyId}`);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  // In a real app, this would make a network request
  console.log(`API Success: Passed property ${propertyId}`);
  // No return value needed for this example
}

/**
 * Temporary function to test the proxy health endpoint.
 */
export async function testProxyHealth() {
  const healthEndpoint = `${API_BASE_URL}/health`;
  console.log(`[API Health Test] Attempting GET ${healthEndpoint} using axios`);
  try {
    const response = await axios.get(healthEndpoint, { timeout: 60000 }); // Changed timeout to 60000ms (60 seconds)
    console.log(`[API Health Test] Success! Status: ${response.status}, Data:`, response.data);
    // Optionally return true or the data
    // return response.data; 
  } catch (error) {
    console.error('[API Health Test] Failed:', error);
    // Optionally return false or the error
    // throw error;
  }
}

/**
 * Temporary function to test a POST request to httpbin.org.
 */
export async function testHttpbin() {
  const testEndpoint = 'https://httpbin.org/post';
  const testData = { test: "data", value: 123 };
  console.log(`[HTTPBin Test] Attempting POST to ${testEndpoint} using axios`);
  try {
    const response = await axios.post(testEndpoint, testData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 15000 // 15s timeout
    });
    console.log(`[HTTPBin Test] Success! Status: ${response.status}, Data:`, response.data);
    // Optionally return true or the data
  } catch (error) {
    console.error('[HTTPBin Test] Failed:', error);
      // Log detailed Axios error if possible
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('[HTTPBin Test] Axios error response:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('[HTTPBin Test] Axios no response received:', error.request);
      } else {
        console.error('[HTTPBin Test] Axios setup error:', error.message);
      }
    } 
    // Optionally return false or the error
  }
} 