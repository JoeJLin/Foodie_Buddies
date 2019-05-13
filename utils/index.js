const User = require("./user");
const Yelp = require("./yelp");
const Room = require("./room");

module.exports = {
  checkAndCreateUser: User.checkAndCreateUser,
  getUserInfo: User.getUserInfo,
  addRoom: User.addRoom,
  addHostRoom: User.addHostRoom,

  getBusinessById: Yelp.getBusinessById,

  getAllRooms: Room.getAllRooms,
  getRoomByName: Room.getRoomByName,
  getRoomById: Room.getRoomById,
  getAllRoomsInfo: Room.getAllRoomsInfo,
  addMemberToRoom: Room.addMemberToRoom
};
