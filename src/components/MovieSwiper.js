import { Grid, Typography } from "@mui/material"
import React from "react"
import MovieCard from "./MovieCard"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import '/styles.css';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import MovieGridLayout from "./MovieGridLayout";


const MovieSwiper = ({sectionTitle, movieType}) => {
    return (
        <>
        <Typography variant="h4" sx={{ marginTop: "40px", marginBottom: "20px", color: "#DBB5B5" }}>
        {sectionTitle}
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
          50: { slidesPerView: 1, spaceBetween: 3},
          646: { slidesPerView: 2, spaceBetween: 3},
          894: { slidesPerView: 3, spaceBetween: 3},
          1025: { slidesPerView: 4, spaceBetween: 3 },
          1440: { slidesPerView: 5, spaceBetween: 3 }
        }}
      modules={[FreeMode, Pagination]}
      className="mySwiper">
        {movieType.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
        </Swiper>
      </Grid>
      </>
    )
}

export default MovieSwiper;