import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SortDropdown = ({ value, onChange, sx }) => {
  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel
        id="sort-select-label"
        sx={{
          backgroundColor: "#000",
          color: "#F1E5D1", // Default label color
          "&.Mui-focused": {
            color: "#F1E5D1", // Focused label color
          },
        }}
      >
        Sort by
      </InputLabel>
      <Select
        labelId="sort-select-label"
        value={value}
        onChange={onChange}
        sx={{
          ...sx, // Allow external styles to be passed
          color: "#F1E5D1", // Ensure selected text is white
          ".MuiInputBase-input": {
            color: "#F1E5D1", // Text inside the dropdown
          },
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "#F1E5D1", // Border color
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "lightgray", // Hover border color
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#F1E5D1", // Focused border color
          },
          ".MuiSelect-icon": {
            color: "#F1E5D1", // Dropdown arrow color
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: "#000", // Background color of dropdown
              color: "#F1E5D1", // Text color inside the dropdown menu
              "& .MuiMenuItem-root": {
                color: "#F1E5D1", // Color for menu items
                "&.Mui-selected": {
                  backgroundColor: "#333", // Background for selected item
                  color: "#F1E5D1", // Text color for selected item
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#555", // Hover background for selected item
                },
              },
            },
          },
        }}
      >
        <MenuItem value="popularity.desc">Popularity (Descending)</MenuItem>
        <MenuItem value="popularity.asc">Popularity (Ascending)</MenuItem>
        <MenuItem value="vote_average.desc">Average Vote (Descending)</MenuItem>
        <MenuItem value="vote_average.asc">Average Vote (Ascending)</MenuItem>
        <MenuItem value="release_date.desc">Release Date (Newest)</MenuItem>
        <MenuItem value="release_date.asc">Release Date (Oldest)</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortDropdown;