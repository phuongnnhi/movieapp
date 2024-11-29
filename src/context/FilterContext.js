import React, { createContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [genres, setGenres] = useState([]); // Array of genres
  const [selectedGenre, setSelectedGenre] = useState(null); // Store the genre ID
  const [sortBy, setSortBy] = useState(""); // Store the sort key
  const navigate = useNavigate();

  // Handle genre change
  const handleGenreChange = useCallback(
    (e) => {
      const genreId = e.target.value;
      setSelectedGenre(genreId);

      const selectedGenreName = genres.find((g) => g.id === parseInt(genreId))?.name || "all";
      console.log("Navigating to Genre:", selectedGenreName);

      console.log("Selected Genre:", selectedGenreName);
      if (selectedGenreName) {
        navigate(`/genre/${selectedGenreName}`);
      } else {
        navigate(`/genre/all`); 
      }
    },
    [genres, navigate]
  );

  // Handle sort change
  const handleSortChange = useCallback(
    (e) => {
      const sortKey = e.target.value;
      setSortBy(sortKey);

      const selectedGenreName = genres.find((g) => g.id === parseInt(selectedGenre))?.name || "all";

      navigate(`/genre/${selectedGenreName}?sort_by=${sortKey}`);
    },
    [genres, navigate, selectedGenre]
  );

  return (
    <FilterContext.Provider
      value={{
        genres,
        setGenres,
        selectedGenre,
        setSelectedGenre,
        sortBy,
        setSortBy,
        handleGenreChange,
        handleSortChange,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};