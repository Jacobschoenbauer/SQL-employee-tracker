const express = require("express");

const mysql = require("mysql2");
const index = require("./index")
const PORT = process.env.PORT || 6500;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Sexy6508$",
    database: "show_db",
  },
  console.log(`Connected to the show_db database.`)
);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});