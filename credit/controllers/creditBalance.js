const Credit = require("../Models/Credit");
const updateCredit = require("../database/updateCredit");
const createCredit = require("../database/createCredit");

const creditBalance = {
  increase: req => {
    const data = req.body
    return Credit('primary').find().then(credit => {
     return credit.length == 0 ? createCredit(data) :
      Credit('replica').find().then(credit =>{
        return credit.length == 0 ? createCredit(data) : updateCredit(data);
      })
    });
  },
  creditMovements: (quantity) => {
    const data = {amount:quantity}
    updateCredit(data)
   .then(credit=>{
     console.log("Amount modified")
    });
  },
};

module.exports = creditBalance;
