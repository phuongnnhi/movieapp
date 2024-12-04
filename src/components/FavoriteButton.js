import { Button, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useContext, useState } from "react";
import { getRequestToken, redirectToAuthPage } from "../auth/authFunction";
import { AuthContext } from "../context/AuthContext";
import { updateFavorites } from "../helpers/favorites/fetchFavorites";

const FavoriteButton = ({ movieId, isFavorite: initialFavorite, onFavoriteToggle, variant}) => {
    const [isFavorite, setIsFavorite] = useState(initialFavorite);
    const [loading, setLoading] = useState();
    const {sessionId, accountId} = useContext(AuthContext);
  

    //when ever the button is clicked, update the movie to endpoint API
    const handleFavoriteToggle = async () => {
      if (!sessionId) {
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
          await updateFavorites(accountId, sessionId, movieId, !isFavorite);
          setIsFavorite(!isFavorite);
          if (onFavoriteToggle) onFavoriteToggle(movieId, !isFavorite);
      } catch (error) {
        if (error.message) {
          alert(error.message); // Only show the specific error message
        }
      } finally {
          setLoading(false);
      }
  };

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