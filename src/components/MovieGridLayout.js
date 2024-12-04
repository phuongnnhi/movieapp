import { Grid, Typography } from "@mui/material";
import React from "react"
import MovieCard from "./MovieCard";


const MovieGridLayout = ({movieType, loading, fallbackMessage = "No results found."}) => {
    if (loading) {
        return <Typography>Loading...</Typography>;
      }
    
      if (!movieType || movieType.length === 0) {
        return <Typography>{fallbackMessage}</Typography>;
      }

    return (      
    <Grid container spacing={1}>
    {movieType.map((movie) => (
      <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
        <MovieCard movie={movie} />
      </Grid>
    ))}
  </Grid>)
}

export default MovieGridLayout;