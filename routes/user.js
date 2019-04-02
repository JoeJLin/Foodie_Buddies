const express = require("express");
const router = express.Router();
const User = require("../models/user");

//create new user
router.post("/", (req, res) => {
  console.log(req.body);
  let email = req.body.email;
  let familyName = req.body.familyName;
  let givenName = req.body.givenName;
  let photoUrl = req.body.photoUrl;
  let googleId = req.body.googleId;

  User.findOne({ googleId }).then(result => {
    if (!result) {
      const user = new User({
        email,
        familyName,
        givenName,
        photoUrl,
        googleId
      });
      user.save(function(err, user) {
        if (err) console.log(err);
        // res.send({ user });
        console.log("save user");
        return;
      });
      // res.send(result);
    }
    console.log("already in our database");
  });
});

module.exports = router;
