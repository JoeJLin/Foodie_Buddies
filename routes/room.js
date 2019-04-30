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
    .getBusinessById(placeId)
    .then(place => {
      console.log(place);
      let room = new Room({
        hostId,
        description,
        // members,
        size,
        name,
        date: formatDate,
        placeId,
        isPrivate,
        roomCode,
        location: {
          coordinates: [
            place.jsonBody.coordinates.latitude,
            place.jsonBody.coordinates.longitude
          ]
        }
        // latitude: place.jsonBody.coordinates.latitude,
        // longitude: place.jsonBody.coordinates.longitude
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

router.get("/", (req, res) => {
  // Room.createIndex({ point: "2dsphere" });
  let latitude = parseFloat(req.query.latitude);
  let longitude = parseFloat(req.query.longitude);
  console.log(req.query);
  utils
    .getAllRooms(latitude, longitude)
    .then(result => {
      // console.log("in result sending", result);
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
