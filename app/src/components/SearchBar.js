import React from "react";

const SearchBar = (props) => {
  return (
    <div className="search-bar-container">
      <form
        id="search-form"
        className="search-bar"
        onSubmit={props.searchBook}
        action=""
      >
        <input
          id="search-input"
          onChange={props.handleSearch}
          type="text"
          placeholder="Search Anything ..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
