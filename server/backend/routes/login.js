const router = require("express").Router();
const db = require("../db");

const userexists = (uid, callback) => {
  db.query(`select uid from Users where uid = "${uid}";`, callback);
};

module.exports = {
  router: router,
  userexists: userexists,
}