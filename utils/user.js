const User = require("../models/user");

const checkAndCreateUser = (userId, email, familyName, givenName, photoUrl) => {
  return new Promise((resolve, reject) => {
    User.findOne({ userId }).then(result => {
      if (result === null) {
        const user = new User({
          email,
          familyName,
          givenName,
          photoUrl,
          userId
        });
        user.save((err, user) => {
          if (err) {
            reject(err);
            return;
          }
          // res.send({ user });
          resolve({ createUser: true });
        });
        // res.send(result);
      } else {
        resolve({ UserExits: true });
        console.log("already in our database");
      }
    });
  });
};

const getUserInfo = userId => {
  return new Promise((resolve, reject) => {
    User.findOne({ userId })
      .then(user => {
        resolve(user);
        return;
      })
      .catch(err => {
        reject(err);
        return;
      });
  });
};

const addRoom = (roomId, userId) => {
  return new Promise((resolve, reject) => {
    let options = {};
    options[`roomList.${roomId}`] = roomId;
    User.findOneAndUpdate(
      { userId },
      { $set: options },
      { useFindAndModify: false }
    )
      .then(result => {
        resolve(result);
        return;
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

const addHostRoom = (roomId, userId) => {
  return new Promise((resolve, reject) => {
    let options = {};
    options[`hostRoomList.${roomId}`] = roomId;
    // console.log("in options!!!!!!!!!!!!", options);
    console.log(userId);
    User.findOneAndUpdate(
      { userId },
      { $set: options },
      { useFindAndModify: false }
    )
      .then(result => {
        resolve(result);
        return;
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

module.exports = {
  checkAndCreateUser,
  getUserInfo,
  addRoom,
  addHostRoom
};
