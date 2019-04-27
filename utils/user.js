const User = require("../models/user");

const checkAndCreateUser = (userId, email, familyName, givenName, photoUrl) => {
  return new Promise((resolve, reject) => {
    User.findOne({ userId }).then(result => {
      if (!result) {
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
      }
      resolve({ UserExits: true });
      console.log("already in our database");
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

module.exports = {
  checkAndCreateUser,
  getUserInfo
};
