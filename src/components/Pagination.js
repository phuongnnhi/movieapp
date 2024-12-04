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
      className="custom-pagination"
  />
</Box>)
}

export default FunctionPagination;