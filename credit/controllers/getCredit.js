const Credit = require("../Models/Credit");

const getCredit = req => {
  return Credit("primary")
    .find()
    .then(credit => {
      if (credit.length > 0) {
        return credit[0].amount;
      } else {
        return "No credit avalaible";
      }
    });
};

module.exports = getCredit;
