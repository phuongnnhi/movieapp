import React, { createContext, useState, useEffect } from 'react';
import { fetchFavoriteMovie } from '../app/apiFunctions';

export const FavoriteMoviesContext = createContext();

export const FavoriteMoviesProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const accountId = localStorage.getItem('account_id');
  const sessionId = localStorage.getItem('session_id');

  const loadFavoriteMovies = async () => {
    if (!accountId || !sessionId) return;
    try {
      const response = await fetchFavoriteMovie(accountId, sessionId);
      setFavoriteMovies(response);
    } catch (error) {
      console.error('Failed to fetch favorite movies:', error);
    }
  };

  useEffect(() => {
    loadFavoriteMovies();
  }, [accountId, sessionId]);

  return (
    <FavoriteMoviesContext.Provider
      value={{ favoriteMovies, setFavoriteMovies, loadFavoriteMovies }}
    >
      {children}
    </FavoriteMoviesContext.Provider>
  );
};