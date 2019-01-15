const Message = require("../Models/Message");

const createMessage = (destination, body, sent, confirm) => {
  const MessagePrimary = Message("primary");

  return new MessagePrimary({
    destination,
    body,
    sent,
    confirm
  })
    .save()
    .then(saved => {
      const MessageReplica = Message("replica");
      return new MessageReplica({
        destination,
        body,
        sent,
        confirm
      }).save();
    });
};

module.exports = createMessage;
