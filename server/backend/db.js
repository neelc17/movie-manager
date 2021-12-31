const mysql = require("mysql");

const dbConfig = {
  host: "127.0.0.1",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
  ssl: {},
};

let db = null;
const handleDisconnect = () => {
  db = mysql.createConnection(dbConfig);
  db.connect((err) => {
    if (err) {
      console.log("DB connection error", err, "\nAttempting to reconnect...");
      setTimeout(handleDisconnect, 100);
    }
    else {
      console.log("DB connection successful");
    }
  });
  db.on("error", (err) => {
    console.log("DB connection error", err, "\nAttempting to reconnect...");
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    }
    else {
      throw err;
    }
  })
};
handleDisconnect();

module.exports = db;