const updateCredit = require("./updateCredit");
const getCredit = require("./getCredit");
const logger = require("../logger");

const checkCredit = () => {
  return getCredit()
    .then(credit => {
      if (credit.length > 0) {
        if (credit[0].amount > 0) {
          const data = { amount: -1 };
          return updateCredit(data)
            .then(() => {
              logger.info("Credit updated without errors");
              return "OK";
            })
            .catch(err => {
              logger.error("Error while saving paiment on Database");
              return "Error while saving paiment on Database";
            });
        } else {
          logger.info("Not enough credit");
          return "Not enough credit";
        }
      } else {
        logger.info("No credit registered");
        return "No credit registered";
      }
    })
    .catch(err => {
      logger.error("Error while checking credit");
      return "Error while checking credit";
    });
};

module.exports = checkCredit;
