const creditValidated = (req) => {
  const { amount } = req.body;
 
  if (amount == "") {
    return false;
  }else if(typeof amount != "number"){
    return false
  } else {
    return true;
  }
};

module.exports = creditValidated;
