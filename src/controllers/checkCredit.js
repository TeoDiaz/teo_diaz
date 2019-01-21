const Credit = require("../Models/Credit");

const checkCredit = () => {
  return Credit('primary').find().then(credit => {
    return credit[0].amount > 0 ? true : false;
  });
};

module.exports = checkCredit;
