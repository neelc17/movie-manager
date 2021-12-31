require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());

if (process.env.DEV !== "true") {
  app.use(cookieParser());

  app.use((req, res, next) => {
    if (req.cookies && req.cookies.loggedIn && req.cookies.loggedIn === true) {
      next();
    }
    else {

    }
  });
}

app.get("/api", (req, res) => {
  res.send("Hello world!");
});

if (process.env.DEV !== "true") {
  app.use(express.static(path.join(__dirname, "frontend", "build")));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
}

const server = http.createServer(app);
const port = process.env.DEV === "true" ? 5000 : 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});