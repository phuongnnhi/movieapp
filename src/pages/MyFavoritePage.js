import { useContext, useEffect, useState } from "react";
import { fetchFavoriteMovie } from "../app/apiFunctions";
import { Box, Grid, Typography } from "@mui/material";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthContext";
import { updateFavorites } from "../helpers/favorites/fetchFavorites";

const MyFavoritePage = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const {sessionId, accountId, isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

    useEffect(()=> {
        const loadFavorite = async() => {
          if (!accountId || !sessionId) {
            setIsLoggedIn(false);
            setLoading(false)
            return; 
          } 
          if (accountId && sessionId) setIsLoggedIn(true)
          try {
                setLoading(true);
                const favoriteMovies = await fetchFavoriteMovie(accountId, sessionId);
                setFavorites(favoriteMovies);
                const favoriteIds = favoriteMovies.map((movie) => movie.id);
    localStorage.setItem("favorites", JSON.stringify(favoriteIds));
            } catch (error) {
                console.error("Faile to fetch favorite movies:", error)
            }
            setLoading(false);
        };
        loadFavorite();
    }, [])
    
    //receive the "announcement" from movie card and render new isFavorite movie
    const handleFavoriteUpdate = (movieId, isFavorite) => {
      setFavorites((prevFavorites) => {
        if (isFavorite) {
          // Add the movie back to the list
          const movie = favorites.find((movie) => movie.id === movieId);
          return [...prevFavorites, { ...movie, is_favorite: true }];
        } else {
          // Remove the movie from the list
          return prevFavorites.filter((movie) => movie.id !== movieId);
        }
      });
    };

    if (loading) return <div>Loading...</div>;
    if (!isLoggedIn) {
      return (
        <Box sx={{ padding: 5, textAlign: "center" }}>
          <Typography variant="h6" sx={{ color: "#987070" }}>
            Log in to add your favorite movies
          </Typography>
        </Box>
      );
    }

    return (
        <Box sx={{ padding: 5 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, color: "#C39898" }}>
        My Favorites
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={1}>
          {favorites.map((movie) => (
            <Grid key={movie.id} item xs={6} sm={4} lg={3} xl={2}>
              <MovieCard
              key={movie.id}
              movie={{ ...movie, is_favorite: true }}
              onFavoriteToggle={handleFavoriteUpdate}
            />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
    )
}

export default MyFavoritePage;