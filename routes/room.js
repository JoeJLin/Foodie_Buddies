const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Room = require("../models/room");
const utils = require("../utils");

router.post("/create", (req, res) => {
  console.log(req.body);
  let hostId = req.body.userId;
  let description = req.body.description;
  // let members = req.body.members;
  let size = req.body.RoomValue;
  let date = req.body.dateValue;
  let time = req.body.TimeValue;
  let placeId = req.body.placeId;
  let isPrivate = req.body.isPrivate;
  let roomCode = req.body.roomCode;
  let name = req.body.name;
  let formatDate = new Date(`${date} ${time}`);
  utils
    .getUserInfo(hostId)
    .then(host => {
      console.log(host);
      let room = new Room({
        host: hostId,
        description,
        // members,
        size,
        date: formatDate,
        placeId,
        isPrivate,
        roomCode
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
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
