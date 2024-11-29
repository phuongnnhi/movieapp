import { Breadcrumbs, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';

const BreadcumbsMenu =({path, currentLabel, resetFilters}) => {
    const navigate = useNavigate();
    const handleHomeClick = () => {
        if (resetFilters) {
          resetFilters(); // Call reset function if provided
        }
        navigate(path || "/"); // Navigate to the home or provided path
      };

return (
<Breadcrumbs
sx={{ color: "#F1E5D1", fontSize: "1.2rem", marginBottom: "20px" }}
separator=">"
>
<Typography
  onClick={handleHomeClick}
  sx={{
    display: "flex",
    alignItems: "center",
    color: "#F1E5D1",
    cursor: "pointer",
    fontSize: "1.2rem",
    fontWeight: "bold",
    "&:hover": { textDecoration: "underline" },
  }}
>
<HomeIcon sx={{ marginBottom: 0.3, mr: 0.5}} fontSize="inherit" />
  Home
</Typography>
{currentLabel && (
<Typography
  sx={{
    color: "#F1E5D1",
    fontSize: "1.2rem",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  }}
>
<MovieIcon sx={{ marginBottom: 0.3, mr: 0.5}} fontSize="inherit" />
  {currentLabel}
</Typography>)}
</Breadcrumbs>)
}

export default BreadcumbsMenu;