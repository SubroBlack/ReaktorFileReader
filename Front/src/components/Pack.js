import React from "react";
import "../App.css";

const Pack = ({ pack, showPack }) => {
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
    </>
  );
};

export default Pack;
