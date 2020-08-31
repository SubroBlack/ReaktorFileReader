const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.static("build"));
app.use(cors());

const status = "./status.real";
const stautsJSON = "./status.json";

// Function to turn list of packages into array of packages name without version:
const list = (packages) => {
  let result = [];
  const packs = packages.split(", ");
  packs.forEach((pack) => {
    result.push(pack.split(" ")[0]);
  });
  return result;
};

/*
  Function to Read given File and Create array of objects
*/
const readGivenFile = (status) => {
  const data = fs.readFileSync(status, {
    encoding: "utf-8",
  });
  const arr = [];
  const packages = data.split("\n\n");
  packages.forEach((package) => {
    let p = {};
    const pack = package.split("\n ").join(" ");
    const lines = pack.split("\n");
    lines.forEach((line, index) => {
      if (line.startsWith("Package: ")) {
        p.name = line.substring(9);
      } else if (line.startsWith("Description: ")) {
        p.description = line.substring(13);
      } else if (line.startsWith("Depends: ")) {
        dependencies = line.substring(9);
        p.dependencies = list(dependencies);
      } else if (line.startsWith("Provides: ")) {
        supports = line.substring(10);
        p.supports = list(supports);
      }
    });
    arr.push(p);
  });
  const result = arr.slice(0, -1);
  return result;
};

/*
  Function to take given data and write it into a JSON file
*/
const makeJSONFile = (data) => {
  const result = JSON.stringify(data);

  fs.writeFileSync("./status.json", result, (err) => {
    err
      ? console.log("Err: ", err)
      : console.log("Successfully written to the file");
  });
};

/*
  Function to Read given File return into JS objects
*/
const readJSONFile = () => {
  const data = fs.readFileSync("./status.json", {
    encoding: "utf-8",
  });
  return JSON.parse(data);
};

app.get("/", (req, res) => {
  res.send("Packages Here!");
});

app.get("/packages", (req, res) => {
  if (!fs.existsSync(stautsJSON)) {
    const data = readGivenFile(status);
    makeJSONFile(data);
  }
  let result = readJSONFile(stautsJSON);
  res.json(result);
});

app.get("/package/:name", (req, res) => {
  const data = readJSONFile();
  const package = data.filter(
    (pack) => pack.name === req.params.name.toString()
  );
  package.length === 0
    ? res.json({ err: "No such package Found" })
    : res.json(package);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server Running on port ", PORT);
});
