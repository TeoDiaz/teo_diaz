const Message = require("../Models/Message")

const getStatus = (req,res) =>{
  const {id} = req.params
  Message("primary").findById(id).then(messageFind=>{
    res.send(`The status of your message is: ${messageFind.status}`)
  }).catch(err=>{
    console.log(err)
    res.send("Your ID doesn't correspond to any message")
  })
}

module.exports = getStatus
