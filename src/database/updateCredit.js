const Credit = require("../Models/Credit");

const updateCredit = (req) => {
  return Credit.find().then(credit => {
    if (credit.length == 0) {
      return new Credit({
        ...req.body
      }).save()
    }
  });
};

module.exports = updateCredit;
