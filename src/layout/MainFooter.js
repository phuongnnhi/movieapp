import React from "react";
import { Box, Container, Typography, Link, Grid } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#C39898", // Footer background color
        color: "#F1E5D1", // Footer text color
        padding: "20px 0", // Padding for the footer
        marginTop: "auto", // Push footer to the bottom of the page
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Column 1 */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link href="/" underline="hover" color="#F1E5D1">
                Home
              </Link>
              <Link href="/favorites" underline="hover" color="#F1E5D1">
                My Favorites
              </Link>
              <Link href="/genre/all" underline="hover" color="#F1E5D1">
                Browse Genres
              </Link>
            </Box>
          </Grid>

          {/* Column 2 */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Have questions or feedback? Email us at:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              phuongnnhi01@gmail.com
            </Typography>
          </Grid>
        </Grid>

        {/* Bottom Footer */}
        <Box
          sx={{
            borderTop: "1px solid #F1E5D1",
            marginTop: "20px",
            paddingTop: "10px",
            textAlign: "center",
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Cinebuds. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;