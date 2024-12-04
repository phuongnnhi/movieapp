import { useTheme } from "@mui/material/styles";
import { getRequestToken, redirectToAuthPage } from "./authFunction"
import { Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const LoginLogoutButton = () => {
    const theme = useTheme();
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
 

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
      localStorage.removeItem("account_id");
      setIsLoggedIn(false);
    }

        return(
        <>
        {!isLoggedIn ? (
            <Typography onClick={handleLogin}
            sx={{
                backgroundColor: theme.palette.secondary.main, 
                color: theme.palette.primary.main, 
                '&:hover': {
                  backgroundColor: theme.palette.secondary.light, 
                },
                fontWeight: "bold",
                padding: "8px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: {
                  xs: '0.8rem', 
                  sm: '1rem',   
                  md: '1.1rem', 
                }
              }}>
      Log in
    </Typography>) :(
      <Typography onClick={handleLogout}
      sx={{
          backgroundColor: theme.palette.secondary.main, 
          color: theme.palette.primary.main, 
          '&:hover': {
            backgroundColor: theme.palette.secondary.light, 
          },
          fontWeight: "bold",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: {
            xs: '0.8rem', 
            sm: '1rem',   
            md: '1.1rem', 
          }
        }}>
Log out
</Typography>)
}
    </>
        )
    }

    export default LoginLogoutButton;