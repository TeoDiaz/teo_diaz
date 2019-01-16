const Message = require("../Models/Message");

const createMessage = (dbSelected,_id,destination, body, status, confirm) => {

const userMessage = Message(dbSelected);
  return new userMessage({
    _id,
    destination,
    body,
    status,
    confirm
  })
    .save()
};

module.exports = createMessage;
