const Credit = require("../Models/Credit");

const createCredit = data => {
  const userCredit = Credit("primary");
  return new userCredit({
   amount: data.amount
  })
    .save()
    .then(() => {
      const userCredit = Credit("replica");
      return new userCredit({
        amount:data.amount
      })
        .save()
        .then(response => {
          return response;
        })
        .catch(err => {
          Credit("primary").collection.drop();
        });
    })
    .catch(err => {
      return err;
    });
};

module.exports = createCredit;
