const Credit = require("../Models/Credit");

const updateCredit = amount => {
  Credit.findOneAndUpdate(
    { name: "amount" },
    { $set: { amount } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      console.log(doc);
    }
  );
};

module.exports = updateCredit;
