import { Button, IconButton } from "@mui/material";
import { updateFavoriteMovie } from "../app/apiFunctions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";

const FavoriteButton = ({ movieId, isFavorite: initialFavorite, onFavoriteToggle, variant}) => {
    const [isFavorite, setIsFavorite] = useState(initialFavorite);
    const [loading, setLoading] = useState();


    const handleFavoriteToggle = async () => {
        const sessionId = localStorage.getItem("session_id");
        const accountId = localStorage.getItem("account_id");

        if (!sessionId) {
          // If user is not logged in, redirect them to login page
          try {
              const requestToken = await getRequestToken();
              redirectToAuthPage(requestToken);
          } catch (error) {
              console.error("Failed to initiate login:", error);
          }
          return;
      }
        setLoading(true);
        try {
            await updateFavoriteMovie(accountId, sessionId, movieId, !isFavorite);
            setIsFavorite(!isFavorite)
            if (onFavoriteToggle) onFavoriteToggle(movieId, !isFavorite);
        } catch (error) {
            console.error("Fail to set favorite status:", error)
        }
        setLoading(false);
    }
    if (variant === "icon") {
        // Icon Button for cards or compact use
        return (
          <IconButton
            onClick={handleFavoriteToggle}
            disabled={loading}
            aria-label="add to favorites"
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        );
      }
    
      // Text Button for larger layouts
      return (
        <Button onClick={handleFavoriteToggle} disabled={loading} variant="outlined" color="primary">
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      );
    };
    
    export default FavoriteButton;