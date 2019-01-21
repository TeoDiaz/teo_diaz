const Credit = require("../Models/Credit");

const getCredit = req => {
  Credit("primary")
    .find()
    .then(credit => {
      if (credit.length > 0) {
        return credit[0].amount > 0 ? true : false;
      }
      return "No credit avalaible"
    });
};

module.exports = getCredit;
