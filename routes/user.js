const express = require("express");
const router = express.Router();
const User = require("../models/user");
const utils = require("../utils");

//create new user
router.post("/", (req, res) => {
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

router.post("/picture", (req, res) => {
  let photoUrl = req.body.photoUrl;
});

router.get("/getUser", (req, res) => {
  let userId = req.query.userId;
  console.log("reached");
  console.log(userId);
  utils
    .getUserInfo(userId)
    .then(user => {
      //console.log(user)
      res.send(user);
      return;
    })
    .catch(err => {
      res.send(err);
    });
});

router.post("/addRoom", (req, res) => {
  let roomId = req.body.roomId;
  let userId = req.body.userId;
  console.log("in add room");
  utils
    .addRoom(roomId, userId)
    .then(result => {
      console.log("it should display user ", result);
      return utils.addMemberToRoom(result._id, roomId);
    })
    .then(response => {
      console.log(response);
      res.send({ addToRoom: true });
      return;
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
