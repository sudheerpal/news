import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const Search = ({ data, clickForDetail, searchQuery, clearResults }) => {
  const onSearch = (e) => {
    let keyword = e.target.value;
    keyword.length >= 3 ? searchQuery(keyword) : clearResults();
  };
  const onResultClick = (event, val) => {
    // console.log(val);
    clickForDetail(val);
  };
  return (
    <Autocomplete
      options={data}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      onChange={onResultClick}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Here"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={onSearch}
        />
      )}
    />
  );
};

export default Search;
