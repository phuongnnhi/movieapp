import { useContext, useEffect, useState } from "react";
import { fetchFavoriteMovie } from "../app/apiFunctions";
import { Box, Grid, Typography } from "@mui/material";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthContext";

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
            } catch (error) {
                console.error("Faile to fetch favorite movies:", error)
            }
            setLoading(false);
        };
        loadFavorite();
    }, [])
    
    //receive the "announcement" from movie card and render new isFavorite movie
    const handleFavoriteUpdate = (movieId, isFavorite) => {
        // Update the local state
        setFavorites((prevFavorites) =>
          isFavorite
            ? [...prevFavorites, favorites.find((movie) => movie.id === movieId)]
            : prevFavorites.filter((movie) => movie.id !== movieId)
        );
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