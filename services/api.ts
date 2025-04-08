// services/api.ts

// Use the actual API base URL confirmed by the user
const API_BASE_URL = 'https://fast-api-backend-rodericandrews.replit.app'; 

// Define expected API Response structure (adjust based on actual API)
interface ChatResponse {
    aiMessage?: string;
    properties?: any[]; // Use a more specific type if available (e.g., PropertyData[])
    smartTags?: any[]; // Use a more specific type if available (e.g., TagData[])
}

/**
 * Sends a user message to the chat API and returns the AI's response.
 * @param userMessage The message text sent by the user.
 * @returns A promise that resolves with the AI's response string.
 */
export async function sendChatMessage(userMessage: string): Promise<ChatResponse> {
  console.log(`[API] Attempting to send message: "${userMessage}"`); // Log 1
  const endpoint = `${API_BASE_URL}/api/chat`; // Assuming this is the correct endpoint
  
  // --- Use Real API Call Logic from User Request ---
  try {
    console.log(`[API] Fetching POST ${endpoint}`); // Log 2
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other necessary headers
      },
      body: JSON.stringify({ message: userMessage }),
    });

    console.log(`[API] Received Response Status: ${response.status}`); // Log 3

    // Get raw text first in case JSON parsing fails
    const rawText = await response.text();
    console.log(`[API] Received Raw Response Text: ${rawText}`); // Log 4

    if (!response.ok) {
      console.error(`[API Error] HTTP Error ${response.status}`);
      throw new Error(`Network response was not ok (${response.status}) - ${rawText}`);
    }

    // Try parsing JSON
    const data: ChatResponse = JSON.parse(rawText); // Parse the raw text
    console.log('[API] Parsed JSON Response:', data); // Log 5
    return data;

  } catch (error) {
    console.error('[API Error] sendChatMessage failed:', error); // Log 6 (Errors)
    // Return an error structure matching ChatResponse
    return {
        aiMessage: "Désolé, une erreur réseau ou serveur s'est produite.",
        properties: [], // Ensure all potential fields are present
        smartTags: []
        };
  }
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