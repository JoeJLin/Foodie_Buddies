const User = require("../models/user");

const checkAndCreateUser = (userId, email, familyName, givenName, photoUrl) => {
  return new Promise((resolve, reject) => {
    User.findOne({ userId }).then(result => {
      console.log("search result!!!: ", result);
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
          console.log("save user");
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
    console.log(userId);
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
    User.findOneAndUpdate({ userId }, { $push: { roomList: roomId } })
      .then(result => {
        console.log(result);
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
  addRoom
};
