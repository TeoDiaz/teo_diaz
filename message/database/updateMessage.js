const Message = require("../Models/Message");
const logger = require('../logger')
const updateMessage = (dbSelected, id, status) => {
  return Message(dbSelected)
    .findByIdAndUpdate(id, { status })
    .then(result => {
      logger.info(`Message modified to status: ${status}`);
    })
    .catch(err => logger.error(`Message not update with ${err}`));
};

module.exports = updateMessage;
