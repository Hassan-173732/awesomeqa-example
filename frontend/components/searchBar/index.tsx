import React from "react";
import {
  TextField,
  IconButton,
  Paper,
  InputBase,
  Divider,
  OutlinedInput,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import searchStyle from "./searchBar.module.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <TextField
      id="outlined-start-adornment"
      variant="standard"
      color="primary"
      InputProps={{
        startAdornment: <SearchIcon style={{ marginLeft: "10px", marginRight: "10px",color: 'white' }} />,
        style: {
          color: 'white',
          padding: '4px',
          borderRadius: '8px',
          backgroundColor: '#302f36',
          borderColor: 'white', // Border color without fieldset
        },
      }}
      style={{ marginTop: '20px', marginLeft: '20px', width: '300px' }}
      placeholder="Search..."
    />
  );
};

export default SearchBar;
