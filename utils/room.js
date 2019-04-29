const Room = require("../models/room");

const getAllRooms = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    console.log(latitude, longitude);
    console.log("in get all room");
    Room.find({
      // isPast: false,
      location: {
        $near: {
          // $maxDistance: 1000,
          $minDistance: 100,
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          }
        }
      }
    })
      // .limit(20)
      .then(results => {
        console.log(results);
        if (results.length === 0) {
          reject({ err: "No locations found!" });
          return;
        }
        resolve(results);
        return;
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

module.exports = {
  getAllRooms
};
