// authFunctions.js
import apiService from "../app/apiService";

// Step 1: Get a request token
export const getRequestToken = async () => {
  try {
    const response = await apiService.get("/authentication/token/new");
    return response.data.request_token;
  } catch (error) {
    console.error("Failed to get request token:", error);
    throw error;
  }
};

// Step 2: Redirect user to authorize token
export const redirectToAuthPage = (requestToken) => {
  const redirectUrl = encodeURIComponent("${window.location.origin}/auth/callback");
  const authUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${redirectUrl}`;
  window.location.href = authUrl;
};

// Step 3: Convert the request token into a session ID
export const getSessionId = async (requestToken) => {
  try {
    const response = await apiService.post("/authentication/session/new", {
      request_token: requestToken,
    });
    return response.data.session_id;
  } catch (error) {
    console.error("Failed to get session ID:", error);
    throw error;
  }
};

// Step 4: Fetch account details to get account_id
export const getAccountDetails = async (sessionId) => {
  try {
    const response = await apiService.get("/account", {
      params: { session_id: sessionId },
    });
    return response.data.id; // This is the account_id
  } catch (error) {
    console.error("Failed to get account details:", error);
    throw error;
  }
};