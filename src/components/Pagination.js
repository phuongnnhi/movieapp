import { Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const FunctionPagination = ({totalPages, currentPage, onPageChange}) => {
return (
<Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
  <Pagination
    count={totalPages} // Total number of pages
    page={currentPage} // Current page
    onChange={(event, value) => onPageChange(value)}
      color="primary"
      sx={{
        "& .MuiPaginationItem-root": {
          color: "#FFFFFF", // Change pagination numbers to white
        },
        "& .Mui-selected": {
          backgroundColor: "#FFFFFF", // Background color for selected
          color: "#000000", // Text color for selected
        },
        "& .MuiPaginationItem-ellipsis": {
          color: "#FFFFFF", // Color for ellipsis
        },
      }}
  />
</Box>)
}

export default FunctionPagination;