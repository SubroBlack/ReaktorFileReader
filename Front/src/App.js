import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Pack from "./components/Pack";

const App = () => {
  const [packages, setPackages] = useState();
  const [packDetails, setPackDetails] = useState();

  // Function to
  const fetchPackages = async () => {
    const result = await axios.get("/packages");
    result.data.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    setPackages(result.data);
  };

  // Fetch the packages Info
  useEffect(() => {
    fetchPackages();
  }, []);

  // Function to find the package by name
  const showPack = (name) => {
    console.log("Pack to be filtered: ", name);
    const packs = packages.filter((p) => p.name === name);
    console.log("Filtered Packs: ", packs);
    if (packs.length === 1) {
      setPackDetails(packs[0]);
    }
  };

  if (!packages) {
    return null;
  }

  console.log("Packs: ", packages);

  return (
    <div className="App">
      <header className="App-header">Packages Info</header>
      {packDetails ? (
        <>
          <Pack pack={packDetails} showPack={showPack} />
          <button onClick={() => setPackDetails(null)}>Home</button>
        </>
      ) : (
        packages.map((pack, index) => (
          <div key={index}>
            <h4
              onClick={() => {
                setPackDetails(pack);
              }}
            >
              {pack.name}
            </h4>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default App;
