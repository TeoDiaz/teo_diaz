const validated = ((req, res) => {
  const { destination, body } = req.body;
  if (destination == "" || body == "") {
   res.status(400).send("You can't provide an empty field ")
   return false
   }else if(destination == Number || body == Number){
    res.status(400).send("Numbers are not allowed")
     return false
   }else{
     return true
   }
})


module.exports = validated
