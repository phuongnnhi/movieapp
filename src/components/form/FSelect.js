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
          className="fselect-textfield"
          SelectProps={{
            native: false,
            MenuProps: {
              PaperProps: {
                className: "fselect-menu-paper",
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