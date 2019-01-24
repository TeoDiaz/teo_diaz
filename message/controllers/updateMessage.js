const Message = require('../Models/Message')

const updateMessage = (dbSelected,id,status) =>{
  return Message(dbSelected).findByIdAndUpdate(id, {status}).then(result =>{
    console.log(`Modified to status: ${status}`)
  }).catch(err =>console.log(err))
}

module.exports = updateMessage