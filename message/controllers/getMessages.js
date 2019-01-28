const getMessages = require("../database/getMessages");
const logger = require('../logger')

module.exports = res => {
  getMessages()
    .then(messages => {
      logger.info("All messages sent")
      res.status(200).send(messages);
    })
    .catch(err => {
      logger.error("Error taking all messages")
      res.status(500).send(`There was an ${err}`);
    });
};
