const Message = require("../Models/Message");

const getStatus = id => {
  return Message("primary").findById(id);
};

module.exports = getStatus;
