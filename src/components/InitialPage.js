import React, { useState, useEffect } from "react";
import { fetchDiscoverMovies, fetchNowPlaying, fetchTrendingAll } from "../app/apiFunctions";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import '/styles.css';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';

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
      <Typography variant="h4" sx={{ marginBottom: "20px", color: "#DBB5B5" }}>
        Trending
      </Typography>
      <Grid container spacing={1}>
      <Swiper
        slidesPerView={5}
        spaceBetween={2}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
            646: { slidesPerView: 2, spaceBetween: 3},
            894: { slidesPerView: 3, spaceBetween: 3},
            1025: { slidesPerView: 4, spaceBetween: 3 },
            1440: { slidesPerView: 5, spaceBetween: 3 }
          }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {trendingMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
            </SwiperSlide>
        ))}
        </Swiper>
      </Grid>

      {/* Recently Released Section */}
      <Typography variant="h4" sx={{ marginTop: "40px", marginBottom: "20px", color: "#DBB5B5" }}>
        Now Playing
      </Typography>
      <Grid container spacing={1}>
      <Swiper
        slidesPerView={5}
        spaceBetween={2}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          646: { slidesPerView: 2, spaceBetween: 3},
          894: { slidesPerView: 3, spaceBetween: 3},
          1025: { slidesPerView: 4, spaceBetween: 3 },
          1440: { slidesPerView: 5, spaceBetween: 3 }
        }}
      modules={[FreeMode, Pagination]}
      className="mySwiper">
        {nowPlaying.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
        </Swiper>
      </Grid>

      {/* All Movies Section */}
      <Typography variant="h4" sx={{ marginTop: "40px", marginBottom: "20px", color: "#DBB5B5" }}>
        All Movies
      </Typography>
      <Grid container spacing={1}>
        {allMovies.map((movie) => (
          <Grid key={movie.id} item xs="12" sm="6" md="4" lg="3" xl="2">
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>


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