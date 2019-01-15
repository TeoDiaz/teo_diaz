const Message = require("../Models/Message")

const getMessages = (conditions = {}) =>{
  return Message.find(conditions)
}

module.exports = getMessages