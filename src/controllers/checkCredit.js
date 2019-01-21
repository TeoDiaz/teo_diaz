const Credit = require("../Models/Credit");

const checkCredit = () => {
  return Credit.find().then(credit => {
    return credit[0].amount > 0 ? true : false;
  });
};

module.exports = checkCredit;
