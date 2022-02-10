const router = require("express").Router();
const db = require("../db");

const userexists = (uid, callback) => {
  db.query(`select uid from Users where uid = "${uid}";`, callback);
};

router.post("/checkuser", (req, res) => {
  if (!req.body.uid) {
    res.status(400).send("No UID provided");
  }
  else {
    userexists(req.body.uid, (err, data) => {
      if (err) {
        console.log("Error checking user", err);
        res.status(500).send(err);
      }
      else {
        res.send(data.length > 0);
      }
    });
  }
});

module.exports = {
  router: router,
  userexists: userexists,
}