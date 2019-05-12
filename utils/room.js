const Room = require("../models/room");
const Utils = require("./index");
const UserFunc = require("./user");
const YelpFunc = require("./yelp");

const getAllRooms = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    Room.find({
      isPast: false,
      location: {
        $nearSphere: {
          $maxDistance: 50000,
          $minDistance: 10,
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          }
        }
      }
    })
      .populate("members") // .limit(20)
      // .exec(function(err, data) {
      //   //do stuff
      //   console.log("dasf!!!!!!", data);
      // });
      .then(results => {
        // console.log(results);
        if (results.length === 0) {
          reject("No locations found!");
          return;
        }
        getAllRoomsInfo(results)
          .then(data => {
            resolve(data);
            return;
          })
          .catch(err => {
            reject(err);
            return;
          });
        // resolve(results);
        // return;
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

const getRoomInfo = room => {
  return new Promise((resolve, reject) => {
    let promises = [
      UserFunc.getUserInfo(room.hostId)
      // YelpFunc.getBusinessById(room.placeId)
    ];
    // console.log("see seee room ", room.members);
    Promise.all(promises)
      .then(result => {
        // console.log("in single room", result);
        let roomInfo = {};
        roomInfo["room"] = {
          id: room._id,
          // date: room.date,
          isPast: room.isPast,
          location: room.location.coordinates,
          members: room.members,
          name: room.name,
          size: room.size,
          isPrivate: room.isPrivate,
          date: formatDate(room.date),
          time: formatAmPm(room.date),
          roomCode: room.roomCode
        };

        roomInfo["host"] = {
          name: result[0].givenName + " " + result[0].familyName,
          photoUrl: result[0].photoUrl,
          email: result[0].email,
          userId: result[0].userId
        };
        // roomInfo["place"] = result[1].jsonBody;
        roomInfo["place"] = room.place;
        resolve(roomInfo);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

const formatDate = date => {
  return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
};

const formatAmPm = date => {
  let time = new Date(date);
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let ampm = hours >= 12 ? " PM" : " AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + ampm;
  return strTime;
};

const getAllRoomsInfo = rooms => {
  return new Promise((resolve, reject) => {
    let promise = [];
    for (ele in rooms) {
      // console.log("this is aaaa", rooms[ele]);
      promise.push(getRoomInfo(rooms[ele]));
    }
    Promise.all(promise)
      .then(allData => {
        // console.log(allData);
        resolve(allData);
        return;
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

const getRoomByName = name => {
  return new Promise((resolve, reject) => {
    Room.findOne({ name, isPast: false })
      .then(response => {
        if (response === null) {
          reject("No such room!!");
          return;
        } else {
          return getRoomInfo(response);
        }
      })
      .then(result => {
        resolve(result);
        return;
      })
      .catch(err => {
        reject(err);
        return;
      });
  });
};

const getRoomById = roomId => {
  return new Promise((resolve, reject) => {
    Room.findOne({ _id: roomId, isPast: false })
      .populate("members")
      .then(room => {
        resolve(room);
        return;
      })
      .catch(err => {
        reject(err);
        return;
      });
  });
};

const addMemberToRoom = (memberId, roomId) => {
  return new Promise((resolve, reject) => {
    Room.findOneAndUpdate(
      { _id: roomId },
      { $push: { members: memberId }, $inc: { size: -1 } }
      // { $inc: { size: -1 } }
    )
      .then(room => {
        resolve(room);
        return;
      })
      .catch(err => {
        reject(err);
        return;
      });
  });
};

module.exports = {
  getAllRooms,
  getRoomByName,
  getRoomById,
  getAllRoomsInfo,
  addMemberToRoom
};
