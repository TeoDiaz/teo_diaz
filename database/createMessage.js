const Message = require('../Models/Message')

const createMessage = (destination, body, sent) =>{
  return new Message ({
    destination,
    body,
    sent
  }).save()
}

module.exports = createMessage
