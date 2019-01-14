const Credit = require("../Models/Credit");
const updateCredit = require("../controllers/updateCredit")
const createCredit = require('../database/createCredit')

const creditBalance = (req) => {
  return Credit.find().then(credit => {
   return credit.length == 0 ? createCredit(req) : updateCredit(req)
  });
};

module.exports = creditBalance;
