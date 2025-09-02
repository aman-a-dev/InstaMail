// services/getTestMail.js
const BASE_URL = "https://api.gettestmail.com";

// Function to create a new email address
export async function createEmail(plan = "free") {
  try {
    // For free tier, use session-based emails
    if (plan === "free") {
      const response = await fetch(`${BASE_URL}/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GETTESTMAIL_API_KEY}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        email: data.email,
        sessionId: data.sessionId,
        expiresAt: data.expiresAt
      };
    } else {
      // For pro users, create a longer-lasting email
      const response = await fetch(`${BASE_URL}/account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GETTESTMAIL_API_KEY}`
        },
        body: JSON.stringify({
          plan: "24_hours", // 24-hour plan for pro users
          description: "InstaMail Pro Account"
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        email: data.email,
        accountId: data.id,
        expiresAt: data.expiresAt,
        apiKey: data.apiKey
      };
    }
  } catch (error) {
    console.error("Error creating email:", error);
    throw error;
  }
}

// Function to fetch messages
export async function getInbox(identifier, isPro = false) {
  try {
    let url;
    
    if (isPro) {
      // For pro users with account-based emails
      url = `${BASE_URL}/account/${identifier.accountId}/messages`;
    } else {
      // For free users with session-based emails
      url = `${BASE_URL}/session/${identifier.sessionId}/messages`;
    }
    
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${isPro ? identifier.apiKey : import.meta.env.VITE_GETTESTMAIL_API_KEY}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching inbox:", error);
    throw error;
  }
}

// Function to get a specific message
export async function getMessage(identifier, messageId, isPro = false) {
  try {
    let url;
    
    if (isPro) {
      url = `${BASE_URL}/account/${identifier.accountId}/message/${messageId}`;
    } else {
      url = `${BASE_URL}/session/${identifier.sessionId}/message/${messageId}`;
    }
    
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${isPro ? identifier.apiKey : import.meta.env.VITE_GETTESTMAIL_API_KEY}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching message:", error);
    throw error;
  }
}

// Function to check email validity/expiration
export async function checkEmailStatus(identifier, isPro = false) {
  try {
    let url;
    
    if (isPro) {
      url = `${BASE_URL}/account/${identifier.accountId}`;
    } else {
      url = `${BASE_URL}/session/${identifier.sessionId}`;
    }
    
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${isPro ? identifier.apiKey : import.meta.env.VITE_GETTESTMAIL_API_KEY}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error checking email status:", error);
    throw error;
  }
}