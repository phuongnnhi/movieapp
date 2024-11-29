import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { fetchMovieDetails } from "../app/apiFunctions";
import { Box, Button, Card, CardContent, CardMedia, Chip, Typography} from "@mui/material";
import BreadcumbsMenu from "../components/BreadcrumbsMenu";
import FavoriteButton from "../components/FavoriteButton";


const MovieDetailPage = ({accountId, sessionId, onFavoriteUpdate}) => {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);


    useEffect(() => {
        const loadMovieDetails = async () =>{
        try {
            const response = await fetchMovieDetails(id); //fetch movie details by ID
            setMovie(response.data)

        } catch (error) {
            console.error("Fail to fetch movie details:", error)          
        }
    };
    loadMovieDetails();
    }, [id]
);
    if (!movie) {
        return <Typography>Loading...</Typography>
    }

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
          isFavorite={movie.is_favorite || false}/>
          </Box>
        </CardContent>
      </Card>
    </Box>
    )
}

export default MovieDetailPage;