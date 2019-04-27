const utils = require("./utils");
const User = require("./models/user");
const express = require("express");
const router = express.Router();

const work = () => {
  console.log("in work");
  // User.updateMany({}, {$set: {}})
};

module.exports = {
  work
};
