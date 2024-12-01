// import React, { createContext, useState, useEffect } from 'react';
// import { fetchFavoriteMovie } from '../app/apiFunctions';

// export const FavoriteMoviesContext = createContext();

// export const FavoriteMoviesProvider = ({ children }) => {
//   const [favoriteMovies, setFavoriteMovies] = useState([]);
    //  const [loading, setLoading] = useState();

//   const accountId = localStorage.getItem('account_id');
//   const sessionId = localStorage.getItem('session_id');

//   const loadFavoriteMovies = async () => {
//     if (!accountId || !sessionId) return;
//     try {
//       const response = await fetchFavoriteMovie(accountId, sessionId);
//       setFavoriteMovies(response);
//     } catch (error) {
//       console.error('Failed to fetch favorite movies:', error);
//     }
//   };
//   const handleFavoriteToggle = async (movieId) => {
//     if (!sessionId) {
//         try {
//           const requestToken = await getRequestToken();
//           redirectToAuthPage(requestToken);
//         } catch (error) {
//           console.error('Failed to initiate login:', error);
//         }
//         return;
// }
// setLoading(true);

//     try {
//       const movieIndex = favoriteMovies.findIndex((movie) => movie.id === movieId);
//       const isFavorite = movieIndex !== -1;
//       await updateFavoriteMovie(accountId, sessionId, movieId, !isFavorite);
      
//       // Update the local favoriteMovies state
//       if (isFavorite) {
//         setFavoriteMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
//       } else {
//         const newMovie = { id: movieId, is_favorite: true }; // Assuming a minimal representation of movie
//         setFavoriteMovies((prevMovies) => [...prevMovies, newMovie]);
//       }
//     } catch (error) {
//       console.error('Failed to set favorite status:', error);
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     loadFavoriteMovies();
//   }, [accountId, sessionId]);

//   return (
//     <FavoriteMoviesContext.Provider
//       value={{ favoriteMovies, setFavoriteMovies, loadFavoriteMovies }}
//     >
//       {children}
//     </FavoriteMoviesContext.Provider>
//   );
// };