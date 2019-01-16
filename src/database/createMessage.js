const Message = require("../Models/Message");

const createMessage = (dbSelected,_id,destination, body, status) => {

const userMessage = Message(dbSelected);
  return new userMessage({
    _id,
    destination,
    body,
    status
  })
    .save()
};

module.exports = createMessage;
