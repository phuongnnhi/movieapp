import { useFormContext, Controller } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";
import { useTheme } from "@emotion/react";

function FSelect({ name, sx, options, ...other }) {
  const { control } = useFormContext();
  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
          sx={{
            ...sx, // Allow external styles to be passed
            ".MuiInputBase-root": {
              color: "#F1E5D1", // Text color
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
            ".MuiInputLabel-root": {
              color: "#F1E5D1", // Label color
            },
            ".MuiInputLabel-root.Mui-focused": {
              color: "#F1E5D1", // Focused label color
            },
            ".MuiSelect-icon": {
              color: "#F1E5D1", // Dropdown arrow color
            },
          }}
          SelectProps={{
            native: false,
            MenuProps: {
              PaperProps: {
                sx: {
                  maxHeight: 300,
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
              MenuListProps: {
                sx: {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  columnGap: '3px',
                  rowGap: '8px',
                  '& .MuiMenuItem-root': {
                    fontSize: '0.8rem',
                    padding: '8px 16px',
                  },
                },
              },
            },
          }}
        >
          {/* Map options to MenuItem components */}
          <MenuItem value="">All Genres</MenuItem>
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          )
          )}
        </TextField>
      )}
    />
  );
}

export default FSelect;