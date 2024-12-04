import React, { useState, useEffect } from "react";
import { fetchDiscoverMovies, fetchNowPlaying, fetchTrendingAll } from "../app/apiFunctions";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import MovieSwiper from "./MovieSwiper";
import MovieGridLayout from "./MovieGridLayout";
// Import Swiper React components


const InitialPage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  // Fetch trending and recently released movies on page load
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Fetch Trending Movies
        const trendingResponse = await fetchTrendingAll();
        setTrendingMovies(trendingResponse.data.results.slice(0, 30));

        // Fetch Recently Released Movies
        const nowPlaying = await fetchNowPlaying();
        setNowPlaying(nowPlaying.data.results.slice(0, 30));

        //Fetch All Movies
        const allMovies = await fetchDiscoverMovies({sort_by:'vote_count.desc'});
        setAllMovies(allMovies.data.results.slice(0,12))
      } catch (error) {
        console.error("Failed to load initial data:", error);
      }
    };
    loadInitialData();
  }, []);

  return (
    <Box sx={{ padding: 5 }}>
      {/* Trending Section */}
      <MovieSwiper sectionTitle="Trending" movieType={trendingMovies}/>

      {/* Recently Released Section */}
      <MovieSwiper sectionTitle="Now Playing" movieType={nowPlaying}/>

      {/* All Movies Section */}
      <Typography variant="h4" sx={{ marginTop: "40px", marginBottom: "20px", color: "#DBB5B5" }}>
        All Movies
      </Typography>
      <MovieGridLayout movieType = {allMovies}/>


      <Box sx={{display: "flex", justifyContent: "center"}}>
      <Button onClick={() => navigate('/genre/all')} sx={{
          backgroundColor: theme.palette.primary.main, 
          color: theme.palette.secondary.main, 
          '&:hover': {
            backgroundColor: theme.palette.primary.light, 
          },
          justifySelf: "center",
          marginTop: "25px",
          fontWeight: "bold",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer"
        }}>Explore more</Button>
        </Box>
    </Box>
  );
};

export default InitialPage;