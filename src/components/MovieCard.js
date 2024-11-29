import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';

export default function MovieCard({movie, accountId, sessionId, onFavoriteUpdate}) {
  const navigate = useNavigate();
  const handleFavoriteToggle = (movieId, isFavorite) => {
    if (onFavoriteUpdate) {
      onFavoriteUpdate(movieId, isFavorite); // Notify parent component
    }
  };
  return (
    <Card sx={{ maxWidth: 345, height: 280, position: 'relative', backgroundColor:"#F1E5D1", color: "#987070", cursor: "pointer"}} onClick={() => navigate(`/movie/${movie.id}`)}>
      <CardMedia
        sx={{ height: 140 }}
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent sx={{paddingBottom:0}}>
        <Typography gutterBottom variant="h6" component="div" sx={{paddingBottom:0, marginBottom:0}}>
          <b>{movie.title? movie.title : movie.name}</b></Typography>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: "4px" }}>
    <b>Release date</b>: {movie.release_date? movie.release_date : movie.first_air_date}
  </Typography>
  <Typography variant="body2" color="textSecondary">
    <b>Average rating</b>: {movie.vote_average}
  </Typography>
      </CardContent>
      <CardActions sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: "10px",
        }}>
      <div onClick={(event) => event.stopPropagation()}>
      <FavoriteButton 
          accountId={accountId}
          variant="icon"
          sessionId={sessionId}
          movieId={movie.id}
          isFavorite={movie.is_favorite || false}
          onFavoriteToggle={handleFavoriteToggle} />
        </div>
      </CardActions>
    </Card>
  );
}