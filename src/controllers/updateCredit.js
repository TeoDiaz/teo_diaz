const Credit = require("../Models/Credit");

const updateCredit = req => {
  const {amount} = req.body
  return Credit('primary').findOneAndUpdate(
    {},
    { $inc:{ amount }},
    {new:true}
  );
};

module.exports = updateCredit;
