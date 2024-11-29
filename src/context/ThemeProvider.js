import React, { createContext, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";

// Create the ThemeContext
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState("#C39898"); // Default primary color
  const [secondaryColor, setSecondaryColor] = useState("#F1E5D1"); // Default secondary color

  // Memoize the theme object to improve performance
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: { main: primaryColor },
          secondary: { main: secondaryColor },
        },
      }),
    [primaryColor, secondaryColor]
  );

  // Provide methods to update the colors
  const updatePrimaryColor = (color) => setPrimaryColor(color);
  const updateSecondaryColor = (color) => setSecondaryColor(color);

  return (
    <ThemeContext.Provider value={{ updatePrimaryColor, updateSecondaryColor }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};