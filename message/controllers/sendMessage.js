const setOnQueue = require('../jobs/setOnQueue')
const createMessage = require("../database/createMessage");
const uniqid = require("uniqid");

const saveOnDatabase = (_id, destination, body) => {
  return createMessage("primary", _id, destination, body, "pending").then(
    () => {
      return createMessage("replica", _id, destination, body, "pending");
    }
  );
};

const startQueue = (req, res) => {
  const { destination, body } = req.body;
  const _id = uniqid();
  saveOnDatabase(_id, destination, body).then(() => {
    setOnQueue(_id, destination, body);
    res.send({ messageID: _id });
  });
};

module.exports = startQueue