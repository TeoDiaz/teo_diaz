const Message = require("../Models/Message");

const getMessages = (res) => {
  return Message("primary")
    .find()
    .then(messages => {
      if (messages.length == 0) {
        res.status(500).send("DataBase is empty");
      } else {
        res.status(200).send(messages);
      }
    })
    .catch(err => {
      res.status(500).send(`There was an ${err}`);
    });
};

module.exports = getMessages;
