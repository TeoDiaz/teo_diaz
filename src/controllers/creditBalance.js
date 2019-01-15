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
    Credit.findOneAndUpdate({}, { $inc: { amount:-1 } }, { new: true }).then(credit=>{
     console.log("Discounted 1")
    });
  },
  creditReturn: ()=>{
    Credit.findOneAndUpdate({}, { $inc: { amount:1 } }, { new: true }).then(credit=>{
      console.log("Credit returned to account")
     });
  }
};

module.exports = creditBalance;
