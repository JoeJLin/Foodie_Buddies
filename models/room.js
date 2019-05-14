const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let RoomSchema = mongoose.Schema({
  name: {
    type: String
  },
  hostId: {
    type: String
  },
  description: {
    type: String
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true
    }
  ],
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
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isPast: {
    type: Boolean,
    default: false
  },
  location: {
    type: { type: String, default: "Point", enum: ["Point"] },
    coordinates: []
    // index: "2dsphere"
  },
  place: {
    id: {
      type: String
    },
    name: { type: String },
    categories: [],
    image_url: { type: String },
    location: {
      display_address: []
    },
    rating: { type: String },
    price: { type: String }
  }
});
RoomSchema.index({ location: "2dsphere" });
const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
