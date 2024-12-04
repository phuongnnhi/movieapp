import React, { useContext } from "react";
import { Grid } from "@mui/material";
import FSelect from "./form/FSelect";
import SortDropdown from "./form/SortDropdown";
import { FilterContext } from "../context/FilterContext";

const FilterAndSort = () => {
  const { genres, selectedGenre, sortBy, handleGenreChange, handleSortChange } = useContext(FilterContext);
  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ padding: "40px", paddingBottom:"0px", marginBottom: "10px" }}>
      <Grid item xs={12} sm={6}>
        <FSelect
          name="genre"
          label="Filter by Genre"
          options= {genres}
          value={selectedGenre}
          onChange={handleGenreChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SortDropdown value={sortBy} onChange={handleSortChange}/>
      </Grid> 
    </Grid>
  );
};

export default FilterAndSort;