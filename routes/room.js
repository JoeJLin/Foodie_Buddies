const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Room = require("../models/room");
const utils = require("../utils");

router.post("/create", (req, res) => {
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
      // console.log(place);
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
          type: "Point",
          coordinates: [
            place.jsonBody.coordinates.longitude,
            place.jsonBody.coordinates.latitude
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
        // console.log(result);
        res.send(result);
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/", (req, res) => {
  // Room.createIndex({ point: "2dsphere" });
  let latitude = req.query.latitude;
  let longitude = req.query.longitude;
  utils
    .getAllRooms(latitude, longitude)
    .then(result => {
      // console.log("in result sending", result);
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
});

router.get("/name", (req, res) => {
  let name = req.query.name;

  utils
    .getRoomByName(name)
    .then(result => {
      res.send(result);
      return;
    })
    .catch(err => {
      console.log("error is ", err);

      res.status(400).send(err);
      return;
    });
});

module.exports = router;
