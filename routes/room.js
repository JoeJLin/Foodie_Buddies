const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Room = require("../models/room");
const utils = require("../utils");

router.post("/create", (req, res) => {
  console.log(req.body);
  let host = req.body.host;
  let description = req.body.description;
  let members = req.body.members;
  let size = req.body.size;
  let date = req.body.date;
  let place = req.body.place;
  let isPrivate = req.body.isPrivate;
  let code = req.body.code;

  let room = new Room({
    host,
    description,
    members,
    size,
    date,
    place,
    isPrivate,
    code
  });
  room.save((err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    console.log(result);
    res.send(result);
  });
});

module.exports = router;
