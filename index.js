const express = require("express");
const fs = require("fs");
const readline = require("readline");
const app = express();

/*
  Function to Read given File and Create array of objects
*/
const readGivenFile = () => {
  const data = fs.readFileSync("status.real", {
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
        p.dependencies = line.substring(9);
      } else if (line.startsWith("Provides: ")) {
        p.supports = line.substring(10);
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
  console.log("Queried");
  const data = readGivenFile();
  makeJSONFile(data);
  res.json(data);
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

app.listen(3000);
