const Credit = require("../Models/Credit");
const connect = require("./connect");
const getCredit = require("./getCredit");

const updateCredit = data => {
  let oldCredit;
  let { amount } = data;
  if (connect.isReplica()) {
    return getCredit()
      .then(credit => {
        if (credit.length > 0) {
          oldCredit = credit.amount;
          return Credit("primary").findOneAndUpdate(
            {},
            { $inc: { amount } },
            { new: true }
          );
        } else {
          return "No credit available";
        }
      })
      .then(() => {
        return Credit("replica")
          .findOneAndUpdate({}, { $inc: { amount } }, { new: true })
          .then(credit => {
            return credit;
          });
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
