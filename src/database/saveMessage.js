const Message = require('../Models/Message')

const createMessage = (destination, body, sent,confirm) =>{
  return new Message ({
    destination,
    body,
    sent,
    confirm
  }).save()
}

module.exports = createMessage
