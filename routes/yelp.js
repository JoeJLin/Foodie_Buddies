const express = require("express");
const router = express.Router();
const yelp = require("yelp-fusion");
require("dotenv").config();
const client = yelp.client(process.env.YELP_KEY);


router.post("/", (req, res) => {
  console.log(req.body.term);
  client
    .search({
      term: req.body.term,
      location: "new york city, ny"
    })
    .then(response => {
      // console.log(response.jsonBody.businesses);
      res.send(response.jsonBody.businesses);
    })
    .catch(e => {
      console.log(e);
    });
});

module.exports = router;