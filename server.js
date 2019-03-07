const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router config
app.use(require("./routes"));

// models && database config
// const models = require("./models/");


const server = app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});

