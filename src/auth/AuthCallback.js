import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAccountDetails, getSessionId } from "./authFunction";
import { AuthContext } from "../context/AuthContext";

const AuthCallback = () => {
  const [searchParams] = useSearchParams(); //retrieve parameters from the URL
  const navigate = useNavigate();
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);

  useEffect(() => {
    const handleAuth = async () => {
      const requestToken = searchParams.get("request_token");
      const approved = searchParams.get("approved");

      if (approved === "true" && requestToken) {
        try {
          const sessionId = await getSessionId(requestToken); // Exchange token for session ID
          localStorage.setItem("session_id", sessionId); // Save session ID
          const accountId = await getAccountDetails(sessionId);

      localStorage.setItem("account_id", accountId);

          console.log("Session ID:", sessionId);
          setIsLoggedIn(true);
          navigate("/"); // Redirect to the homepage
        } catch (error) {
          console.error("Failed to complete authentication:", error);
        }
      } else {
        console.error("User did not approve the request.");
        navigate("/"); // Redirect to the homepage
      }
    };

    handleAuth();
  }, [searchParams, navigate]);

  return <div>Authenticating...</div>;
};

export default AuthCallback;