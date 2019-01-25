const Credit = require("../Models/Credit");

const getCredit = () => {
  return Credit("primary").find();
};

module.exports = getCredit;
