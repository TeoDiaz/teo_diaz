const Message = require("../Models/Message");

const getStatus = id => {
  Message("primary")
    .findById(id)
    .then(messageFind => {
      return messageFind;
    })
    .catch(err => {
      return err;
    });
};

module.exports = getStatus;
