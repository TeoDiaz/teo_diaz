const Credit = require("../Models/Credit");
const updateCredit = require("../controllers/updateCredit");
const createCredit = require("./createCredit");

const creditBalance = {
  increase: req => {
    return Credit('primary').find().then(credit => {
      console.log(credit)
     return credit.length == 0 ? createCredit(req) :
      Credit('replica').find().then(credit =>{
        return credit.length == 0 ? createCredit(req) : updateCredit(req);
      })
    });
  },
  creditMovements: (quantity) => {
    const req = {body:{amount:quantity}}
    updateCredit(req)
   .then(credit=>{
     console.log("Amount modified")
    });
  },
};

module.exports = creditBalance;
