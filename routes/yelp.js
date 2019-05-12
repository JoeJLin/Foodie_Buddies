const express = require("express");
const router = express.Router();
const yelp = require("yelp-fusion");
require("dotenv").config();
const client = yelp.client(process.env.YELP_KEY);

router.get("/search", (req, res) => {
  client
    .search({
      term: req.query.term,
      location: req.query.location
      // location: "new york city, ny"
    })
    .then(response => {
      // console.log(response.jsonBody.businesses);
      res.send(response.jsonBody.businesses);
    })
    .catch(e => {
      console.log(e);
    });
});

router.get("/detail", (req, res) => {
  client
    .business(req.query.id)
    .then(response => {
      // console.log(response);
      res.send(response);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
