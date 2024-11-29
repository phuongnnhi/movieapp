import { useEffect, useState } from "react";
import { fetchFavoriteMovie } from "../app/apiFunctions";
import { Box, Grid, Typography } from "@mui/material";
import MovieCard from "../components/MovieCard";

const MyFavoritePage = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const accountId = localStorage.getItem("account_id");
    const sessionId = localStorage.getItem("session_id");

    useEffect(()=> {
        const loadFavorite = async() => {
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

    const handleFavoriteUpdate = (movieId, isFavorite) => {
        // Update the local state
        setFavorites((prevFavorites) =>
          isFavorite
            ? [...prevFavorites, favorites.find((movie) => movie.id === movieId)]
            : prevFavorites.filter((movie) => movie.id !== movieId)
        );
      };

    if (loading) return <div>Loading...</div>;
    
    return (
        <Box sx={{ padding: 5 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, color: "#C39898" }}>
        My Favorites
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((movie) => (
            <Grid key={movie.id} item xs={6} sm={4} lg={3}>
              <MovieCard
              key={movie.id}
              movie={{ ...movie, is_favorite: true }}
              onFavoriteUpdate={handleFavoriteUpdate}
            />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
    )
}

export default MyFavoritePage;