import React, { useState, useEffect } from "react";
import { fetchNowPlaying, fetchTrendingAll } from "../app/apiFunctions";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

const InitialPage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  // Fetch trending and recently released movies on page load
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Fetch Trending Movies
        const trendingResponse = await fetchTrendingAll();
        setTrendingMovies(trendingResponse.data.results.slice(0, 12));

        // Fetch Recently Released Movies
        const nowPlaying = await fetchNowPlaying();
        setNowPlaying(nowPlaying.data.results.slice(0, 12));
      } catch (error) {
        console.error("Failed to load initial data:", error);
      }
    };
    loadInitialData();
  }, []);

  return (
    <Box sx={{ padding: 5 }}>
      {/* Trending Section */}
      <Typography variant="h4" sx={{ marginBottom: "20px", color: "#DBB5B5" }}>
        Trending
      </Typography>
      <Grid container spacing={1}>
        {trendingMovies.map((movie) => (
          <Grid key={movie.id} item xs={6} sm={4} lg={3} xl={2}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {/* Recently Released Section */}
      <Typography variant="h4" sx={{ marginTop: "40px", marginBottom: "20px", color: "#DBB5B5" }}>
        Now Playing
      </Typography>
      <Grid container spacing={3}>
        {nowPlaying.map((movie) => (
          <Grid key={movie.id} item xs={6} sm={4} lg={3} xl={2}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{display: "flex", justifyContent: "center"}}>
      <Button onClick={() => navigate('/genre/all')} sx={{
          backgroundColor: theme.palette.primary.main, // Use secondary color for background
          color: theme.palette.secondary.main, // Use primary color for text
          '&:hover': {
            backgroundColor: theme.palette.primary.light, // Slightly lighter background on hover
          },
          justifySelf: "center",
          marginTop: "25px",
          fontWeight: "bold",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer"
        }}>All Movies</Button>
        </Box>
    </Box>
  );
};

export default InitialPage;