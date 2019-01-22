const Credit = require("../Models/Credit");
const updateCredit = require("../controllers/updateCredit");

const checkCredit = () => {
  return Credit("primary")
    .find()
    .then(credit => {
      if (credit.length > 0) {
        if (credit[0].amount > 0) {
          const req = { body: { amount: -1 } };
          return updateCredit(req).then(() => true);
        } else {
          return false;
        }
      } else {
        return false;
      }
    })
    .catch(err => console.log(err));
};

module.exports = checkCredit;
