import React, { useState } from "react";

export const SearchBar = ({ getQuery }) => {
  const [text, setText] = useState("");
  const onChange = (event) => {
    setText(event);
    getQuery(event);
  };
  return (
    <section className="search">
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Search Film"
          value={text}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
        />
      </form>
    </section>
  );
};

export default SearchBar;
