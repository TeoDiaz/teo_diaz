const Message = require("../Models/Message");

const getMessages = () => {
  return Message("primary").find();
};

module.exports = getMessages;
