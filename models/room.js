const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = mongoose.Schema({
  host: {
    type: String
  },
  description: {
    type: String
  },
  members: [{ type: Schema.Types.ObjectId }],
  date: {
    type: Date
  },
  size: {
    type: Number
  },
  place: {
    type: String
  },
  isPrivate: {
    type: Boolean
  },
  code: {
    type: String
  }
});

const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
