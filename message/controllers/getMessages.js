const getMessages = require("../database/getMessages");

module.exports = res => {
  getMessages()
    .then(messages => {
      res.status(200).send(messages);
    })
    .catch(err => {
      res.status(500).send(`There was an ${err}`);
    });
};
