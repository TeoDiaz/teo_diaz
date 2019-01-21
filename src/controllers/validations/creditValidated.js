const creditValidated = (req, res) => {
  const { amount } = req.body;
  if (amount == "") {
    res.status(400).send("You can't provide an empty field");
    return false;
  }else if(amount != Number){
    res.status(400).send("The amount must be a number")
    return false
  } else {
    return true;
  }
};

module.exports = creditValidated;
