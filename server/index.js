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
      // if (req.query.uid) {
      //   myLogin.userExists(req.query.uid, (err, data) => {
      //     if (err) {
      //       console.log("Error checking user", err);
      //       res.status(500).send(err);
      //     }
      //     else {
      //       if (data.length > 0) {
      //         res.cookie("loggedIn", "true", {
      //           maxAge: (24 * 60 * 60 * 1000),
      //           secure: true,
      //           httpOnly: true,
      //         });
      //         next();
      //       }
      //       else {
      //         res.status(401).send("Unauthorized");
      //       }
      //     }
      //   });
      // }
      // else {
      //   res.status(401).send("Unauthorized");
      // }
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