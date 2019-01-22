const Credit = require("./Models/Credit");

const checkCredit = () => {
  Credit.find().then(credit => {
    if (credit.length > 0) {
      credit[0] > 0 ? true : false;
    } else {
      return false;
    }
  });
};

module.exports = checkCredit;
