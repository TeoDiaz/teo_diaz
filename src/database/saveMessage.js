const Message = require("../Models/Message");

const createMessage = (dbSelected,destination, body, sent, confirm, res) => {
const userMessage = Message(dbSelected);
  return new userMessage({
    destination,
    body,
    sent,
    confirm
  })
    .save()
};

module.exports = createMessage;
