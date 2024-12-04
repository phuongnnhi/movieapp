import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import { updateFavorites } from '../helpers/favorites/fetchFavorites';

export default function MovieCard({movie, onFavoriteToggle}) {
  const navigate = useNavigate();
  const sessionId = localStorage.getItem('session_id');
  const accountId = localStorage.getItem('account_id');
  //localStorage.get("favorite")
  const [isFavorite, setIsFavorite] = React.useState(() => {
    const favorites = new Set(JSON.parse(localStorage.getItem("favorites")) || []);
    return favorites.has(movie.id)
  }

  );

  const handleFavoriteToggle = async() => {
    const newFavoriteStatus = !isFavorite
      if (!accountId || !sessionId) {
    console.error("Missing accountId or sessionId", { accountId, sessionId });
    return;
  }
    try {
      await updateFavorites(accountId, sessionId, movie.id, newFavoriteStatus)
      setIsFavorite(newFavoriteStatus)
      if (onFavoriteToggle) {
        onFavoriteToggle(movie.id, newFavoriteStatus);
      }
    } catch (error) {
      console.error("Fail to toggle fav status:", error)
    }
  }

  return (
    <Card sx={{ maxWidth: 345, height: 350, position: 'relative', backgroundColor:"#F1E5D1", color: "#987070", cursor: "pointer"}} onClick={() => navigate(`/movie/${movie.id}`)}>
      <CardMedia
        sx={{ height: 140 }}
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent sx={{paddingBottom:0 }} >
        <Typography gutterBottom variant="h6" component="div" sx={{paddingBottom:0, marginBottom:0,  fontSize: {
              xs: '0.9rem', 
              sm: '1rem',   
              md: '1.1rem', 
            },}}>
          <b>{movie.title? movie.title : movie.name}</b></Typography>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: "4px", fontSize: {
              xs: '0.8rem', 
              sm: '1rem',   
              md: '1.1rem', 
            },}}>
    <b>Release date</b>: {movie.release_date? movie.release_date : movie.first_air_date}
  </Typography>
  <Typography variant="body2" color="textSecondary" sx={{fontSize: {
              xs: '0.8rem', 
              sm: '1rem',   
              md: '1.1rem',
            },}}>
    <b>Average rating</b>: {movie.vote_average}
  </Typography>
      </CardContent>
      <CardActions
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: "10px",
            paddingBottom: "10px",
        }}>
      <div onClick={(event) => event.stopPropagation()}>
      <FavoriteButton 
          accountId={accountId}
          variant="icon"
          sessionId={sessionId}
          movieId={movie.id}
          isFavorite = {isFavorite}
          onFavoriteToggle={handleFavoriteToggle} /> 
          {/* deliver the prop to button */}
        </div>
      </CardActions>
    </Card>
  );
}