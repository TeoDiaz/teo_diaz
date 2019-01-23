const Credit = require("../Models/Credit");
const updateCredit = require("../controllers/updateCredit");

const checkCredit = () => {
  return Credit("primary")
    .find()
    .then(credit => {
      if (credit.length > 0) {
        if (credit[0].amount > 0) {
          const req = { body: { amount: -1 } };
          return updateCredit(req)
            .then(() => "OK")
            .catch(err => "Error while saving paiment on Database");
        } else {
          return "Not enough credit";
        }
      } else {
        return "No credit registered";
      }
    })
    .catch(err => "Error while checking credit");
};

module.exports = checkCredit;