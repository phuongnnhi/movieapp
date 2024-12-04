import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper for carousel
import "swiper/css"; // Import Swiper styles
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { fetchFeaturedMovies } from "../app/apiFunctions";
import { Navigation } from 'swiper/modules';
import FavoriteButton from "./FavoriteButton";
import { updateFavorites } from "../helpers/favorites/fetchFavorites";
import { AuthContext } from "../context/AuthContext";

const FeaturedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const {sessionId, accountId} = useContext(AuthContext)

  // Fetch popular movies
  useEffect(() => {
    const loadFeaturedMovies = async () => {
      try {
        const { data } = await fetchFeaturedMovies();
        setMovies(data.results);
        setSelectedMovie(data.results[0]); // Default selected movie
      } catch (error) {
        console.error("Failed to fetch featured movies:", error);
      }
    };

    // Load favorites from local storage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(new Set(storedFavorites));

    loadFeaturedMovies();
  }, []);

  // Handle favorite status toggle for selected movie
  const handleFavoriteToggle = async () => {
    if (!selectedMovie || !accountId || !sessionId) {
      console.error("Missing selectedMovie, accountId, or sessionId", { selectedMovie, accountId, sessionId });
      return;
    }
  
    const movieId = selectedMovie.id;
    const newFavoriteStatus = !favorites.has(movieId);
  
    try {
      await updateFavorites(accountId, sessionId, movieId, newFavoriteStatus);
  
      // Update local state with the updated favorites set
      setFavorites((prevFavorites) => {
        const updatedFavorites = new Set(prevFavorites);
        if (newFavoriteStatus) {
          updatedFavorites.add(movieId);
        } else {
          updatedFavorites.delete(movieId);
        }
        return updatedFavorites;
      });
    } catch (error) {
      console.error("Failed to toggle favorite status:", error);
    }
  };

  return (
    <Box sx={{ background: "#000", color: "#fff", padding: "20px" }}>
      {/* Most Popular Section */}
      <Typography variant="h6" sx={{ marginBottom: "10px", color:"#C39898" }}>
        <b>Most Popular</b>
      </Typography>
      
      {/* Movie Carousel */}
      <Swiper
        slidesPerView={7}
        spaceBetween={1}
        loop={true}
        navigation={true} 
        breakpoints={{
          375: { slidesPerView: 1, spaceBetween: 3},
            646: { slidesPerView: 2, spaceBetween: 3},
            894: { slidesPerView: 3, spaceBetween: 3},
            1024: { slidesPerView: 4, spaceBetween: 2 },
            1440: { slidesPerView: 6, spaceBetween: 3 }
          }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Box
              component="img"
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
              sx={{
                height: "100px",
                width: "270px",
                objectFit: "cover",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "transform 0.3s",
                border: selectedMovie?.id === movie.id ? "4px solid #F1E5D1" : "none",
              }}
              onClick={() => setSelectedMovie(movie)} // Select movie on click
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Selected Movie Details */}
      {selectedMovie && (
        <Box
        sx={{
          position: "relative", // Ensure overlay and content are properly layered
            width: "100%",
            height: "100%",
          overflow: "hidden",
        }}
      >
        {/* Image with Gradient Overlay */}
        <Box
          sx={{
            width: "100%",
            height: "80vh",
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 10%, rgba(0,0,0,1)), url(https://image.tmdb.org/t/p/w1280${selectedMovie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <Box sx={{
            width: "100%",
            padding: "40px",
            paddingBottom:"20px",
            marginTop: "-20%",
            gap: "10px",
            boxSizing: "border-box",
            color: "white"
          }}>
            <Typography variant="h4">{selectedMovie.title}</Typography>
            <Typography variant="body1" sx={{ marginTop: "10px" }}>
              {selectedMovie.overview}
            </Typography>
            <Box sx={{ display: "flex", marginTop: "15px", gap: "10px" }}>
              <Button
                variant="contained"
                onClick={() => alert("Play movie!")}
                sx={{color: "white", backgroundColor:"#C39898"}}
              >
                <b>Play</b>
              </Button>
              <FavoriteButton
                movieId={selectedMovie.id}
                onFavoriteToggle={handleFavoriteToggle}
                isFavorite={favorites.has(selectedMovie.id)}
                variant="outlined"
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FeaturedMovies;