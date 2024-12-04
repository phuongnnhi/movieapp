import { Box, Container} from "@mui/material";
import FeaturedMovies from "../components/FeaturedMovies";
import React, { useContext, useEffect, useState } from "react";
import MovieAppBar from "../layout/MainHeader";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import FilterAndSort from "../components/FilterandSort";
import { FormProvider, useForm } from "react-hook-form";
import { fetchGenres } from "../app/apiFunctions";
import { FilterContext } from "../context/FilterContext";
import Footer from "../layout/MainFooter";
 // Corrected import

function HomePage() {
    const location = useLocation();
    const methods = useForm();

      // States for filter and sort
  const {setGenres} = useContext(FilterContext);


  // Fetch genres when the page loads
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreList = await fetchGenres();
        setGenres(genreList.data.genres);
      } catch (error) {
        console.error("Failed to load genres:", error);
      }
    };
    loadGenres();
  }, []);


  return (
    <FormProvider {...methods}>
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "0px",
        margin: "0",
      }}
      maxWidth={false}
    >

        <MovieAppBar />
        {location.pathname === "/" && <FeaturedMovies />}
        {location.pathname !== "/favorites" && location.pathname !== "/" && location.pathname !== "/movie" && <FilterAndSort/>}
 
      <Box sx={{flexGrow:"1", display: "flex",
    flexDirection: "column", justifyContent: "flex-start"}}>
             
        <Outlet />
        </Box>
        <Footer />
    </Container>
    </FormProvider>
  );
}

export default HomePage;