const validated = (req, res) => {
  const { destination, body } = req.body;
  if (destination == "" || body == "") {
    res.status(400).send("You can't provide an empty field");
    return false;
  } else if (destination == Number || body == Number) {
    res.status(400).send("Numbers are not allowed");
    return false;
  } else if (destination == undefined || body == undefined) {
    res.status(400).send("Destination or Body fields missing");
    return false;
  } else if (destination.length > 50 || body.length > 100) {
    res
      .status(413)
      .send("Destination name or message text had exceed the length limit");
    return false;
  } else {
    return true;
  }
};

module.exports = validated;