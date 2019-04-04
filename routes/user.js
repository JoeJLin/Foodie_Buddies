const express = require("express");
const router = express.Router();
const User = require("../models/user");
const utils = require("../utils");

//create new user
router.post("/", (req, res) => {
  console.log(req.body);
  let email = req.body.email;
  let familyName = req.body.familyName;
  let givenName = req.body.givenName;
  let photoUrl = req.body.photoUrl;
  let userId = req.body.userId;

  utils
    .checkAndCreateUser(userId, email, familyName, givenName, photoUrl)
    .then(result => {
      if (result) {
        res.send(result);
      }
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

router.get("/getUser", (req, res) => {
  console.log(req.query.userId);
});

module.exports = router;
