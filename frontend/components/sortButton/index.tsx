import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SortIcon from "@mui/icons-material/Sort";
import sortStyle from "./sortButton.module.css";

interface SortButtonProps {
  onSort: (order: "asc" | "desc") => void;
}

const SortButton: React.FC<SortButtonProps> = ({ onSort }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (order: "asc" | "desc") => {
    onSort(order);
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="medium"
        className={sortStyle.sort}
      >
        <SortIcon />
      </IconButton>
      <Menu
        className={sortStyle.dropdownMenu}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}

        PaperProps={{
            style: {
                backgroundColor: '#3e3e44', 
                color: '#fff'
            },
        }}
      >
        <MenuItem onClick={() => handleSort("asc")}>Date: Ascending</MenuItem>
        <MenuItem onClick={() => handleSort("desc")}>Date: Descending</MenuItem>
      </Menu>
    </>
  );
};

export default SortButton;
