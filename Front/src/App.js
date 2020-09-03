import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Pack from "./components/Pack";
import Search from "./components/Search";

const App = () => {
  const [packages, setPackages] = useState();
  const [packDetails, setPackDetails] = useState();
  const [displayPacks, setDisplayPacks] = useState();

  // Function to Fetch Packages
  const fetchPackages = async () => {
    const result = await axios.get("/packages");
    console.log("Result from Server: ", result.data);
    result.data.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    setPackages(result.data);
    setDisplayPacks(result.data);
    console.log("Packs: ", result.data);
  };

  // Fetch the packages Info
  useEffect(() => {
    fetchPackages();
  }, []);

  // Function to open the package details
  const showPack = (name) => {
    const packs = packages.filter((p) => p.name === name);
    if (packs.length === 1) {
      setPackDetails(packs[0]);
    }
  };

  if (!displayPacks) {
    return null;
  }

  return (
    <div className="App">
      <header className="App-header">Packages Info</header>
      <Search packages={packages} setDisplayPacks={setDisplayPacks} />
      {packDetails ? (
        <>
          <Pack pack={packDetails} showPack={showPack} />
          <button onClick={() => setPackDetails(null)}>Home</button>
        </>
      ) : (
        displayPacks.map((pack, index) => (
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
