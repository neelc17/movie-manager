const mysql = require("mysql");

const dbConfig = {
  host: "127.0.0.1",
  port: process.env.DEV === "true" ? 3308 : 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
  // ssl: {},
  connectionLimit: 20,
};

let db = mysql.createPool(dbConfig);
console.log("DB connection pool created");

module.exports = db;