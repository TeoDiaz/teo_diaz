const Credit = require("../Models/Credit");
const updateCredit = require("../controllers/updateCredit");
const createCredit = require("../database/createCredit");

const creditBalance = {
  increase: req => {
    return Credit.find().then(credit => {
      return credit.length == 0 ? createCredit(req) : updateCredit(req);
    });
  },
  creditMovements: (quantity) => {
    Credit.findOneAndUpdate({}, { $inc: { amount:quantity} }, { new: true }).then(credit=>{
     console.log("Amount modified")
    });
  },
};

module.exports = creditBalance;
