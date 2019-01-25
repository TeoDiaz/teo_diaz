const getCredit = require("../database/getCredit");

module.exports = res => {
  getCredit().then(credit => {
    if (credit.length > 0) {
      res.send(`Your credit is: ${credit[0].amount}`);
    } else {
      res.send("No credit avalaible");
    }
  });
};
