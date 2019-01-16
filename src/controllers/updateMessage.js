const Message = require('../Models/Message')

const updateMessage = (dbSelected,id,status) =>{
  return Message(dbSelected).findByIdAndUpdate(id, {status}).then(result =>{
    console.log(result)
  })
}


module.exports = updateMessage