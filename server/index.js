require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const cookieParser = require("cookie-parser");

const db = require("./backend/db");
const myLogin = require("./backend/routes/login");

const app = express();
app.use(express.json());
app.use(cors());

if (process.env.DEV !== "true") {
  app.use(cookieParser());

  app.use((req, res, next) => {
    if (req.query.uid) {
      myLogin.userexists(req.query.uid, (err, data) => {
        if (err) {
          console.log("Error checking user", err);
          res.status(500).send(err);
        }
        else {
          if (data.length > 0) {
            res.cookie("loggedIn", req.query.uid, {
              maxAge: (24 * 60 * 60 * 1000),
              secure: true,
              httpOnly: true,
            });
            next();
          }
          else {
            res.status(401).send("Unauthorized");
          }
        }
      });
    }
    else {
      if (req.cookies?.loggedIn === true) {
        next();
      }
      else {
        res.status(401).send("Unauthorized");
      }
    }
  });
}

app.use("/api/login", myLogin.router);
app.get("/api", (req, res) => {
  res.send("Hello world!");
});

app.get("/api/getformprefill", (req, res) => {
  db.query(`select name from Genres; select name from Countries; select name from DistComps; select name from ProdComps; select name from Directors;`, [1, 2, 3, 4, 5],  (err, data) => {
    if (err) {
      console.log("Error getting form prefill data", err);
      res.status(500).send(err);
    }
    else {
      let tempdata = {
        genres: [],
        countries: [],
        distComps: [],
        prodComps: [],
        directors: [],
      };
      for (let i of data[0]) {
        tempdata.genres.push(i.name);
      }
      for (let i of data[1]) {
        tempdata.countries.push(i.name);
      }
      for (let i of data[2]) {
        tempdata.distComps.push(i.name);
      }
      for (let i of data[3]) {
        tempdata.prodComps.push(i.name);
      }
      for (let i of data[4]) {
        tempdata.directors.push(i.name);
      }
      res.send(tempdata);
    }
  });
});

app.post("/api/entermovie", (req, res) => {
  if (!(req.body.uid && Array.isArray(req.body.dates) && req.body.title && Array.isArray(req.body.genres) && !isNaN(req.body.runtime) && !isNaN(req.body.year) && req.body.rating && Array.isArray(req.body.countries) && Array.isArray(req.body.distComps) && Array.isArray(req.body.prodComps) && Array.isArray(req.body.directors) && !isNaN(req.body.erate) && !isNaN(req.body.orate))) {
    res.status(400).send("Invalid data provided");
  }
  else {
    db.query(`insert ignore into Movies values(NULL, "${req.body.title}", ${req.body.runtime}, "${req.body.year}", "${req.body.rating}"); select id from Movies where title = "${req.body.title}" and runtime = ${req.body.runtime} and year = "${req.body.year}" and rating = "${req.body.rating}";`, [1, 2], (err, data) => {
      if (err) {
        console.log("Error inserting movie", err);
        res.status(500).send(err);
      }
      else {
        const movieid = data[1][0].id;
        const datesobj = JSON.stringify({ dates: req.body.dates }).replace(/\"/g, '"');
        db.query(`insert into UserMovie values(NULL, (select id from Users where uid = "${req.body.uid}"), ${movieid}, '${datesobj}', ${req.body.erate}, ${req.body.orate});`, (err1, data1) => {
          if (err1) {
            console.log("Error inserting usermovie", err1);
            res.status(500).send(err1);
          }
          else {
            let tempquery = "";
            for (let i of req.body.genres) {
              tempquery += `insert ignore into Genres values(NULL, "${i}"); insert ignore into MovieGenre values(NULL, ${movieid}, (select id from Genres where name = "${i}")); `;
            }
            for (let i of req.body.countries) {
              tempquery += `insert ignore into Countries values(NULL, "${i}"); insert ignore into MovieCountry values(NULL, ${movieid}, (select id from Countries where name = "${i}")); `;
            }
            for (let i of req.body.distComps) {
              tempquery += `insert ignore into DistComps values(NULL, "${i}"); insert ignore into MovieDist values(NULL, ${movieid}, (select id from DistComps where name = "${i}")); `;
            }
            for (let i of req.body.prodComps) {
              tempquery += `insert ignore into ProdComps values(NULL, "${i}"); insert ignore into MovieProd values(NULL, ${movieid}, (select id from ProdComps where name = "${i}")); `;
            }
            for (let i of req.body.directors) {
              tempquery += `insert ignore into Directors values(NULL, "${i}"); insert ignore into MovieDirector values(NULL, ${movieid}, (select id from Directors where name = "${i}")); `;
            }
            db.query(tempquery, (err2, data2) => {
              if (err2) {
                console.log("Error inserting movie data", err2);
                res.status(500).send(err2);
              }
              else {
                res.send("OK");
              }
            });
          }
        });
      }
    });
  }
});

app.post("/api/getusermovies", (req, res) => {
  if (!req.body.uid) {
    res.status(400).send("No UID provided");
  }
  else {
    db.query(`select * from Movies where id in (select movieid from UserMovie where userid = (select id from Users where uid = "${req.body.uid}"));`, (err, data) => {
      if (err) {
        console.log("Error getting movie data", err);
        res.status(500).send(err);
      }
      else {
        let movies = [];
        let umquery = "";
        let resarr = [];
        for (let i = 0; i < data.length; i++) {
          movies.push({
            title: data[i].title,
            runtime: data[i].runtime,
            year: data[i].year,
            rating: data[i].rating,
          });
          umquery += `select * from UserMovie where movieid = ${data[i].id} and userid = (select id from Users where uid = "${req.body.uid}");`;
          resarr.push(i + 1);
        }
        if (movies.length === 0) {
          res.send(movies);
        }
        else {
          db.query(umquery, resarr, (err1, data1) => {
            if (err1) {
              console.log("Error getting usermovie data", err1);
              res.status(500).send(err1);
            }
            else {
              let oquery = "";
              let resarr1 = [];
              for (let i = 0; i < movies.length; i++) {
                if (movies.length > 1) {
                  movies[i].dates = JSON.parse(data1[i][0].dates).dates;
                  movies[i].erate = data1[i][0].erate;
                  movies[i].orate = data1[i][0].orate;
                }
                else {
                  movies[i].dates = JSON.parse(data1[i].dates).dates;
                  movies[i].erate = data1[i].erate;
                  movies[i].orate = data1[i].orate;
                }
                oquery += `select name from Genres where id in (select genreid from MovieGenre where movieid = ${data[i].id});
                          select name from Countries where id in (select countryid from MovieCountry where movieid = ${data[i].id});
                          select name from DistComps where id in (select distid from MovieDist where movieid = ${data[i].id});
                          select name from ProdComps where id in (select prodid from MovieProd where movieid = ${data[i].id});
                          select name from Directors where id in (select directorid from MovieDirector where movieid = ${data[i].id});`;
                for (let j = 1; j <= 5; j++) {
                  resarr1.push((i * 5) + j);
                }
              }
              db.query(oquery, resarr1, (err2, data2) => {
                if (err2) {
                  console.log("Error getting other data", err2);
                  res.status(500).send(err2);
                }
                else {
                  for (let i = 0; i < movies.length; i++) {
                    movies[i].other = [];
                    for (let j = 0; j < 5; j++) {
                      movies[i].other[j] = data2[(i * 5) + j];
                    }
                  }
                  res.send(movies);
                }
              });
            }
          });
        }
      }
    })
  }
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