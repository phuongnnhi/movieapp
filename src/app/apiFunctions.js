import apiService from "./apiService";

// Fetch popular movies
export const fetchFeaturedMovies = (page = 1) =>
  apiService.get("/movie/popular", { params: { page } });

// Fetch movies with optional filters
export const fetchDiscoverMovies = (filters = {}, page = null) => {
  const { query, ...restFilters } = filters;

  // Use `/search/movie` if a query is provided, otherwise use `/discover/movie`
  const endpoint = query ? "/search/movie" : "/discover/movie";

  // Only include `page` if it is explicitly passed (non-null)
  const params = { ...restFilters, query };
  if (page !== null) {
    params.page = page;
  }

  return apiService.get(endpoint, { params });
};

//Fetch trending All
export const fetchTrendingAll = () => apiService.get("/trending/all/day")

//Fetch now_playing movies
export const fetchNowPlaying = (page=1) => apiService.get("/movie/now_playing", { params: { page } })

// Fetch movie details by ID
export const fetchMovieDetails = (id) =>
  apiService.get(`/movie/${id}`);

// Fetch list of genres
export const fetchGenres = () =>
  apiService.get("/genre/movie/list");

// Search movies by query
export const searchMovies = (query, page = 1) =>
  apiService.get("/search/movie", { params: { query, page } });

//Fetch Favorite movie
export const fetchFavoriteMovie = async(accountId, sessionId, page=1) => {
try {
  const response = await apiService.get(`account/${accountId}/favorite/movies`, {
    params: {
      session_id: sessionId, page,
    }
  });
  return response.data.results;
} catch (error) {
  console.error("Failed to fetch favorite movies:", error);
  throw error;
}

}
//1 function moi de goi fetchfavmovie va updatelocalstorage

//Add/remove favorite movies
export const updateFavoriteMovie = async (accountId, sessionId, movieId, favorite) => {
try {
  await apiService.post(
      `/account/${accountId}/favorite`,
      {
        media_type:"movie",
        media_id: movieId,
        favorite: favorite //true to add, false to remove
      },
      {
        params: {
          session_id: sessionId
        }
      }
    )
} catch (error) {
  console.error("Fail to update favorite movie:", error)
  if (error.response && error.response.status === 404) {
    alert("The movie you are trying to update is unavailable in the database.");
  }
}
}