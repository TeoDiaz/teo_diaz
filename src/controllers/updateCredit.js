const Credit = require("../Models/Credit");
const connect = require("../database/connect");
const updateCredit = req => {
  if (connect.isReplica()) {
    return Promise.resolve(
      Credit("primary")
        .find()
        .then(credit => {
          let oldCredit = credit;
          const { amount } = req.body;
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
                    { $inc: { amount: oldCredit } },
                    { new: true }
                  );
                  return err;
                });
            })
            .catch(err => {
              return err;
            });
        })
    );
  }
};

module.exports = updateCredit;
