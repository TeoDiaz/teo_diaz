const Message = require('../Models/Message')

const updateMessage = (dbSelected,id,status) =>{
  console.log("Modificando")
  return Message(dbSelected).findByIdAndUpdate(id, {status}).then(result =>{
    console.log(result)
  }).catch(err =>console.log(err))
}

module.exports = updateMessage