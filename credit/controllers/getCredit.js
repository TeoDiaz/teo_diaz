const getCredit = require("../database/getCredit");

module.exports = res => {
  getCredit()
    .then(credit => {
      if (credit.length > 0) {
        logger.info("Credit sent");
        res.send(`Your credit is: ${credit[0].amount}`);
      } else {
        logger.error(`No credit available`);
        res.send("No credit avalaible");
      }
    })
    .catch(err => {
      logger.error(`Error ${err} getting Credit`);
    });
};
