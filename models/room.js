const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = mongoose.Schema({
  name: {
    type: String
  },
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
  placeId: {
    type: String
  },
  isPrivate: {
    type: Boolean
  },
  roomCode: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
