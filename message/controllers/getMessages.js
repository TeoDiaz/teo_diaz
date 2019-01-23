const getMessages = require("../clients/getMessages");

module.exports = res => {
  getMessages()
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
