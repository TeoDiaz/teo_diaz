const getStatus = require("../database/getStatus");
const logger = require('../logger')
module.exports = (req, res) => {
  const { id } = req.params;
  getStatus(id)
    .then(response => {
      logger.info("Message status sent");
      res.send(`The status of your message is: ${response.status}`);
    })
    .catch(err => {
      logger.error("Error getting message status");
      res.sendStatus(404);
    });
};
