import { useTheme } from "@mui/material/styles";
import { getRequestToken, redirectToAuthPage } from "./authFunction"
import { Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const LoginLogoutButton = () => {
    const theme = useTheme();
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
 

    useEffect(() => {
      // Check if a session ID exists in localStorage
      const sessionId = localStorage.getItem("session_id");
      setIsLoggedIn(!!sessionId); // Set login state
      console.log(isLoggedIn)
    }, [setIsLoggedIn]);

    const handleLogin = async () => {
        try {
            const requestToken = await getRequestToken(); //get request token
            redirectToAuthPage(requestToken); // Redirect to TMDB auth page
            } catch (error) {
            console.error("Login failed:", error)
            }
        };

    const handleLogout = () => {
      localStorage.removeItem("session_id");
      setIsLoggedIn(false);
    }

        return(
        <>
        {!isLoggedIn ? (
            <Typography onClick={handleLogin}
            sx={{
                backgroundColor: theme.palette.secondary.main, // Use secondary color for background
                color: theme.palette.primary.main, // Use primary color for text
                '&:hover': {
                  backgroundColor: theme.palette.secondary.light, // Slightly lighter background on hover
                },
                fontWeight: "bold",
                padding: "8px 16px",
                borderRadius: "8px",
                cursor: "pointer"
              }}>
      Log in
    </Typography>) :(
      <Typography onClick={handleLogout}
      sx={{
          backgroundColor: theme.palette.secondary.main, // Use secondary color for background
          color: theme.palette.primary.main, // Use primary color for text
          '&:hover': {
            backgroundColor: theme.palette.secondary.light, // Slightly lighter background on hover
          },
          fontWeight: "bold",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer"
        }}>
Log out
</Typography>)
}
    </>
        )
    }

    export default LoginLogoutButton;