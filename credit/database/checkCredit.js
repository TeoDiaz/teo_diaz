const updateCredit = require("./updateCredit");
const getCredit = require("./getCredit");

const checkCredit = () => {
  return getCredit()
    .then(credit => {
      if (credit.length > 0) {
        if (credit[0].amount > 0) {
          const data = { amount: -1 };
          return updateCredit(data)
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
