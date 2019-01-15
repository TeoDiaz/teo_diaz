const Message = require("../Models/Message")

const getMessages = (conditions = {}) =>{
  return Message("primary").find(conditions)
}

module.exports = getMessages