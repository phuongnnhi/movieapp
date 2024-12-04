import React, { useContext, useEffect, useState } from "react";
import { fetchDiscoverMovies } from "../app/apiFunctions";
import { Box} from "@mui/material";
import Grid from "@mui/material/Grid";
import MovieCard from "../components/MovieCard";
import { useParams,  useNavigate, Link } from "react-router-dom";
import FunctionPagination from "../components/Pagination";
import BreadcumbsMenu from "../components/BreadcrumbsMenu";
import { FilterContext } from "../context/FilterContext";
import MovieGridLayout from "../components/MovieGridLayout";

const GenrePage = () => {
  const { genre } = useParams();
  const { genres, sortBy, setSortBy, setSelectedGenre } = useContext(FilterContext);

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const resetFilters = () => {
    setSelectedGenre(""); // Reset the genre selection
    setSortBy(""); // Reset the sort selection
  };

  // Fetch movies based on the selected genre
  useEffect(() => {
    const loadGenreMovies = async () => {
      try {
        const filters = { page }; // Default filters include page

        // If a genre is selected, include its ID
        if (genre && genre !== "all") {
          const selectedGenre = genres.find((g) => g.name === genre);
          if (selectedGenre) {
            filters.with_genres = selectedGenre.id;
          }
        }

        // If sortBy is selected, include it in the filters
        if (sortBy) {
          filters.sort_by = sortBy;
        }

        console.log("Filters Sent to API:", filters);

        const response = await fetchDiscoverMovies(filters);
        console.log("API Response:", response.data);

        setFilteredMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Failed to load genre movies:", error);
      }
    };
    loadGenreMovies();
  }, [genre, genres, sortBy, page]);

  return (
    <Box sx={{ padding: 5 }}>
    <BreadcumbsMenu path="/" currentLabel={genre} resetFilters={resetFilters}/>
    <MovieGridLayout movieType = {filteredMovies}/>
      <FunctionPagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={(value) => setPage(value)}
      />
    </Box>
  );
};

export default GenrePage;