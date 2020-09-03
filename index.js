const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.static("build"));
app.use(cors());

const status = "./status.real";
const statusJSON = "./status.json";

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
const readJSONFile = (status) => {
  const data = fs.readFileSync(status, {
    encoding: "utf-8",
  });
  return JSON.parse(data);
};

app.get("/", (req, res) => {
  res.send("Packages Here!");
});

app.get("/packages", (req, res) => {
  if (!fs.existsSync(statusJSON)) {
    const data = readGivenFile(status);
    makeJSONFile(data);
  }
  let result = readJSONFile(statusJSON);
  res.json(result);
});

app.post("/packages/:name", (req, res) => {
  console.log("Post Req Came", req.body);
  const data = readJSONFile(statusJSON);
  const result = data.filter((p) => p.name === req.params.name.toString());
  if (result.length === 0) {
    res.json({ err: "No such package Found" });
  }
  const pack = result[0];
  pack.tags ? (pack.tags = pack.tags.concat(req.body)) : (pack.tags = req.body);
  const otherPacks = data.filter((p) => p.name !== req.params.name.toString());
  otherPacks.push(pack);
  makeJSONFile(otherPacks);
  newData = readJSONFile(statusJSON);
  res.json(newData);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server Running on port ", PORT);
});
