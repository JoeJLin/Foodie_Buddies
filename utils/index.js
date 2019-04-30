const User = require("./user");
const Yelp = require("./yelp");
const Room = require("./room");

module.exports = {
  checkAndCreateUser: User.checkAndCreateUser,
  getUserInfo: User.getUserInfo,
  addRoom: User.addRoom,

  getBusinessById: Yelp.getBusinessById,

  getAllRooms: Room.getAllRooms
};
