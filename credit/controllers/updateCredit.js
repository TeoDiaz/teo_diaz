const Credit = require("../Models/Credit");
const connect = require("../database/connect");

const updateCredit = req => {
  if (connect.isReplica()) {
    return Promise.resolve(
      Credit("primary")
        .find()
        .then(credit => {
          if (credit.length > 0) {
            let oldCredit = credit;
            let {amount} = req.body
            return Credit("primary")
              .findOneAndUpdate({}, { $inc: { amount } }, { new: true })
              .then(credit => {
                return Credit("replica")
                  .findOneAndUpdate({}, { $inc: { amount } }, { new: true })
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
              })
              .catch(err => {
                return err;
              });
          } else {
            return "No credit avalaible";
          }
        })
    );
  } else {
    console.log("One or more database are disconnected");
  }
};

module.exports = updateCredit;
