import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { fetchDiscoverMovies } from "../app/apiFunctions";
import FunctionPagination from "./Pagination";
import { Box, Grid, Typography } from "@mui/material";
import MovieCard from "./MovieCard";

const SearchResultsPage = () => {
    const { query } = useParams(); // Extract the search query from the URL
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const searchMovies = async () => {
            try {
                setLoading(true);
                const response = await fetchDiscoverMovies({query});
                setMovies(response.data.results)
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.log("Fial to fetch results:", error)
            }
            setLoading(false);
        };
    searchMovies();
}, [query, page]);

const handlePageChange = (newPage) => {
    setPage(newPage); // Update page state when pagination is clicked
  };

return (
    <Box sx={{ padding: 5 }}>
      <Typography variant="h4" sx={{ marginBottom: "20px", color: "#DBB5B5" }}>
        Search Results for "{query}"
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <Grid key={movie.id} item xs={6} sm={4} lg={3} xl={2}>
                  <MovieCard movie={movie} />
                </Grid>
              ))
            ) : (
              <Typography>No results found.</Typography>
            )}
          </Grid>
          {/* Include FunctionPagination */}
          {totalPages > 1 && (
            <FunctionPagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default SearchResultsPage;