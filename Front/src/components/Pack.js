import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const Pack = ({ pack, showPack }) => {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  // Adding Tags:
  const addTags = (event) => {
    event.preventDefault();
    tags.push(tag);
    console.log("Tags: ", tags);
    setTag("");
  };

  // Submit Form
  const submitForm = () => {
    axios.post(`/packages/${pack.name}`, tags);
    setTag("");
    setTags([]);
  };

  // Render the list of clickable packages
  const showList = (list) => {
    return list.map((i, index) => (
      <div
        key={index}
        onClick={() => {
          showPack(i);
        }}
      >
        {i}
      </div>
    ));
  };

  return (
    <>
      <h4>{pack.name}</h4>
      <p>{pack.description}</p>

      <form onSubmit={submitForm}>
        <input
          type="text"
          value={tag}
          onChange={({ target }) => setTag(target.value)}
        />
        <input type="button" onClick={addTags} value="Add" />
        {tags.length > 0 ? (
          <>
            <br />
            <b>Tags to be Added: </b>
            {showList(tags)}
          </>
        ) : null}
        <br />
        <button type="submit">Submit</button>
      </form>

      <br />
      {pack.dependencies ? (
        <>
          <b>Dependencies: </b>
          {showList(pack.dependencies)}
        </>
      ) : null}
      {pack.supports ? (
        <>
          <b>Reverse Dependencies: </b>
          {showList(pack.supports)}
        </>
      ) : null}
      {pack.tags ? (
        <>
          <b>Tags: </b>
          {showList(pack.tags)}
        </>
      ) : null}
    </>
  );
};

export default Pack;
