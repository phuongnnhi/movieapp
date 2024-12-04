import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SortDropdown = ({ value, onChange}) => {
  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel
        id="sort-select-label"
       className="input-label"

      >
        Sort by
      </InputLabel>
      <Select
        labelId="sort-select-label"
        value={value}
        onChange={onChange}
        className="select"
        label="Sort by"
        MenuProps={{
          PaperProps: {
            className: "menu-paper",
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