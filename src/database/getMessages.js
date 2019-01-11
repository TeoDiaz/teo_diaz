const Message = require("../Models/Message")

const takeMessage = (conditions = {}) =>{
  return Message.find(conditions)
}

module.exports = takeMessage