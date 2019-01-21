const Credit = require("../Models/Credit");

const createCredit = req => {
  const userCredit = Credit("primary");
  return new userCredit({
    ...req.body
  })
    .save()
    .then(credit => {
      const userCredit = Credit("replica");
      return new userCredit({
        ...req.body
      })
        .save()
        .then(response => {
          return response;
        })
        .catch(err => {
          Credit('primary').collection.drop()
        });
    })
    .catch(err => {
      return err;
    });
};

module.exports = createCredit;
