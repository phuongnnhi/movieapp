import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import './App.css';
import InitialPage from './components/InitialPage';
import GenrePage from './pages/GenrePage';
import SearchResultsPage from './components/MovieSearchPage';
import MyFavoritePage from './pages/MyFavoritePage';
import { getRequestToken, redirectToAuthPage } from './auth/authFunction';
import AuthCallback from './auth/AuthCallback';
import { AuthProvider } from './context/AuthContext';
import { FilterProvider } from './context/FilterContext';

function App() {

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if the current route is the callback route
        const currentPath = window.location.pathname;
        if (currentPath === '/auth/callback') return;

        // Check if the session ID exists
        const sessionId = localStorage.getItem("session_id");
        const accountId = localStorage.getItem("account_id");
        if (!sessionId) {
          const requestToken = await getRequestToken();
          redirectToAuthPage(requestToken);
        }
      } catch (error) {
        console.error("Failed to initialize authentication:", error);
      }
    };
    initializeAuth();
  }, []);
  return (
    <AuthProvider>
      
    <Router>
    <FilterProvider>
      <Routes>
      <Route path="/" element={<HomePage  />}>
        <Route index element={<InitialPage />} />
        <Route path={"genre/:genre" || "genre/all"} element={<GenrePage />} />
        <Route path="search/:query" element={<SearchResultsPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/favorites" element={<MyFavoritePage />} /> 
        {/* Callback for authentication */}
        <Route path="/auth/callback" element={<AuthCallback />} />
        {/* Handle undefined routes */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Route>
    </Routes>
    </FilterProvider>
    </Router> 
    </AuthProvider>
  );
}

export default App;