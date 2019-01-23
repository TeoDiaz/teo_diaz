const Credit = require("../Models/Credit");
const connect = require("../database/connect");

const updateCredit = req => {
  let oldCredit
  if (connect.isReplica()) {
    return Credit("primary")
      .find()
      .then(credit => {
        if (credit.length > 0) {
          oldCredit = credit;
          let { amount } = req.body;
          return Credit("primary").findOneAndUpdate(
            {},
            { $inc: { amount } },
            { new: true }
          );
        }else{
          return "No credit available"
        }
      })
      .then(() => {
        return Credit("replica").findOneAndUpdate(
          {},
          { $inc: { amount } },
          { new: true }
        );
      })
      .then(credit => {
        return credit;
      })
      .catch(err => {
        Credit("primary").findOneAndUpdate(
          {},
          { $set: { amount: oldCredit } },
          { new: true }
        );
        return err;
      });
  } else {
    console.log("One or more database are disconnected");
  }
};

module.exports = updateCredit;
