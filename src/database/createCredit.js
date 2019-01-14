const Credit = require('../Models/Credit')

const createCredit = req =>{
  return new Credit({
    ...req.body
  }).save()
};

module.exports = createCredit
