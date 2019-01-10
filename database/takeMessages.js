const Message = require("../Models/Message")

const takeMessage = () =>{
  return Message.find()
}

module.exports = takeMessage