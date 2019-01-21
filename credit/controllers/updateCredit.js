const Credit = require("../Models/Credit");
const connect = require("../database/connect");

const updateCredit = amount => {
  if (connect.isReplica()) {
    return Promise.resolve(
      Credit("primary")
        .find()
        .then(credit => {
          let oldCredit = credit;
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
        .catch(err=>{
          console.log(err)
          return "No credit avalaible"
        })
    );
  }else{
    console.log("One or more database are disconnected")
  }
};

module.exports = updateCredit;