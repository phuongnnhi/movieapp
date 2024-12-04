import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import LoginLogoutButton from '../auth/LoginLogoutButton';
import { AuthContext } from '../context/AuthContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function MovieAppBar() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = React.useState("");
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchInput.trim()) {
    navigate(`/search/${searchInput.trim()}`);
    }
  };
  return (
    <Box >
      <AppBar position="static" sx={{backgroundColor:"#C39898"}}>
        <Toolbar>
          <Typography
          onClick={() => navigate("/")}
            variant="h5"
            noWrap
            component="div"
            
            sx={{ display: { xs: 'none', sm: 'block' }, color:"#373A40", cursor: "pointer"}}
          >
            <b>Cinebuds</b>
          </Typography>
          <form onSubmit={handleSearchSubmit}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              inputProps={{
                "aria-label": "search",
              }}
            />
          </Search>
          </form>
          <Box sx={{ flexGrow: 1 }} />
          <Typography sx={{ color:"#373A40", cursor: "pointer", padding: "10px", fontSize: {
              xs: '0.9rem', // Smaller font size for extra-small screens
              sm: '1rem',   // Normal size for small screens
              md: '1.1rem', // Larger size for medium and larger screens
            }}}
  color="inherit"
  onClick={() => navigate("/genre/all")}
>
  All Movies
</Typography>
          <Typography sx={{ color:"#373A40", cursor: "pointer", padding: "10px", fontSize: {
              xs: '0.9rem', // Smaller font size for extra-small screens
              sm: '1rem',   // Normal size for small screens
              md: '1.1rem', // Larger size for medium and larger screens
            }}}
  color="inherit"
  onClick={() => navigate("/favorites")}
>
  My Favorite
</Typography>
<LoginLogoutButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}