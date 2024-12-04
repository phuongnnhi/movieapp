import { Button, IconButton } from "@mui/material";
import { updateFavoriteMovie } from "../app/apiFunctions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useContext, useState } from "react";
import { getRequestToken, redirectToAuthPage } from "../auth/authFunction";
import { AuthContext } from "../context/AuthContext";

const FavoriteButton = ({ movieId, isFavorite: initialFavorite, onFavoriteToggle, variant}) => {
    const [isFavorite, setIsFavorite] = useState(initialFavorite);
    const [loading, setLoading] = useState();
    const {sessionId, accountId} = useContext(AuthContext)

    //when ever the button is clicked, update the movie to endpoint API
    const handleFavoriteToggle = async () => {
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
        //the new favorite status when the button is clicked is the revert from the current status (true=>false)
        try {
            await updateFavoriteMovie(accountId, sessionId, movieId, !isFavorite);
            setIsFavorite(!isFavorite)
            //announce to movie card to update the state of the movie and announce to my fav page
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