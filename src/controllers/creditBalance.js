const Credit = require("../Models/Credit");
const updateCredit = require("../controllers/updateCredit")

const creditBalance = (req) => {
  return Credit.find().then(credit => {
    credit.length == 0 ? saveCredit(req) : updateCredit(req)
  });
};

module.exports = creditBalance;
