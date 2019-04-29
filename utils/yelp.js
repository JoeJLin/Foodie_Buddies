const yelp = require("yelp-fusion");
require("dotenv").config();
const client = yelp.client(process.env.YELP_KEY);

const getBusinessById = id => {
  return new Promise((resolve, reject) => {
    client
      .business(id)
      .then(response => {
        console.log(response);
        resolve(response);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

module.exports = {
  getBusinessById
};
