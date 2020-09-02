import React from "react";

const Search = ({ packages, setDisplayPacks }) => {
  // Search Function:
  const search = (value) => {
    setDisplayPacks(packages.filter((p) => p.name.includes(value)));
  };

  return (
    <div className="SearchBar">
      <b>Find a Package </b>
      <input
        type="text"
        name="searchTerm"
        onKeyUp={({ target }) => search(target.value)}
      />
    </div>
  );
};

export default Search;
