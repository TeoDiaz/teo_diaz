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
      }).save();
    });
};

module.exports = createCredit;
