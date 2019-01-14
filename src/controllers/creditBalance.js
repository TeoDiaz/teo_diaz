const Credit = require("../Models/Credit");
const updateCredit = require("../controllers/updateCredit");
const createCredit = require("../database/createCredit");

const creditBalance = {
  increase: req => {
    return Credit.find().then(credit => {
      return credit.length == 0 ? createCredit(req) : updateCredit(req);
    });
  },
  decrease: () => {
    Credit.findOneAndUpdate({}, { $inc: { amount:-1 } }, { new: true });
  }
};

module.exports = creditBalance;
