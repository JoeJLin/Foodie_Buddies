const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
const { MongoClient } = require("mongodb");
const assert = require("assert");
require("dotenv").config();
const mongoose = require("mongoose");
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router config
app.use(require("./routes"));

// models && database config
// const models = require("./models/");
mongoose.connect(
  process.env.DB_PATH,
  { useCreateIndex: true, useNewUrlParser: true },
  (err, db) => {
    if (err) {
      console.log(err);
    } else {
      console.log("connect to db");
    }
  }
);

const server = app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
