import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { fetchMovieDetails } from "../app/apiFunctions";
import { Box, Button, Card, CardContent, CardMedia, Chip, Typography} from "@mui/material";
import BreadcumbsMenu from "../components/BreadcrumbsMenu";
import FavoriteButton from "../components/FavoriteButton";
import { updateFavorites } from "../helpers/favorites/fetchFavorites";


const MovieDetailPage = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const sessionId = localStorage.getItem('session_id');
const accountId = localStorage.getItem('account_id');

    useEffect(() => {
      const loadMovieDetails = async () => {
        try {
          const response = await fetchMovieDetails(id);
          setMovie(response.data);
    
          // Check if the movie is in favorites
          const favorites = new Set(JSON.parse(localStorage.getItem("favorites")) || []);
          setIsFavorite(favorites.has(response.data.id));
        } catch (error) {
          console.error("Failed to fetch movie details:", error);
        }
      };
      loadMovieDetails();
    }, [id]);
    if (!movie) {
        return <Typography>Loading...</Typography>
    }

    const handleFavoriteToggle = async () => {
      const newFavoriteStatus = !isFavorite;
      if (!accountId || !sessionId) {
        console.error("Missing accountId or sessionId", { accountId, sessionId });
        return;
      }
      try {
        await updateFavorites(accountId, sessionId, movie.id, newFavoriteStatus);
        setIsFavorite(newFavoriteStatus);
      } catch (error) {
        console.error("Failed to toggle favorite status:", error);
      }
    };

    return (
        <Box sx={{ padding: 5 }}>
      <BreadcumbsMenu path="/" currentLabel={movie.title}/>
      <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, backgroundColor: "#F1E5D1" }}>
        {/* Movie Poster */}
        <CardMedia
          component="img"
          sx={{ width: { xs: "100%", md: "40%" }, objectFit: "cover" }}
          image={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
          alt={movie.title}
        />
        {/* Movie Details */}
        <CardContent sx={{padding: "30px"}}>
          <Typography variant="h4" gutterBottom sx={{color: "#987070"}}>
            <b>{movie.title}</b>
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
           <b>Release Date</b>: {movie.release_date}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
           <b>Length</b>: {movie.runtime} minutes
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            <b>Rating</b>: {movie.vote_average}/10
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            {movie.overview}
          </Typography>

          {/* Genres */}
          <Box sx={{ marginTop: 2 }}>
            {movie.genres.map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                sx={{ marginRight: 1, marginBottom: 1 }}
              />
            ))}
          </Box>

          {/* Actions */}
          <Box sx={{ marginTop: 3 }}>
            <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
              Watch Now
            </Button>
            <FavoriteButton
  accountId={accountId}
  sessionId={sessionId}
  movieId={movie.id}
  isFavorite={isFavorite}
  onFavoriteToggle={handleFavoriteToggle}
/>
          </Box>
        </CardContent>
      </Card>
    </Box>
    )
}

export default MovieDetailPage;