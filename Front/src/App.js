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
    console.log("Packs: ", packages);
  };

  // Fetch the packages Info
  useEffect(() => {
    fetchPackages();
  }, []);

  // Function to find the package by name
  const showPack = (name) => {
    const packs = packages.filter((p) => p.name === name);
    if (packs.length === 1) {
      setPackDetails(packs[0]);
    }
  };

  if (!packages) {
    return null;
  }

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
