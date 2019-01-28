const setOnQueue = require("../jobs/setOnQueue");
const createMessage = require("../database/createMessage");
const uniqid = require("uniqid");
const logger = require("../logger");

const saveOnDatabase = (_id, destination, body) => {
  return createMessage("primary", _id, destination, body, "pending")
    .then(() => {
      logger.info("Saved pending new message on Primary DB");
      return createMessage("replica", _id, destination, body, "pending");
    })
    .catch(err => {
      logger.warning("Only saved on Primary Database");
    });
};

const startQueue = (req, res) => {
  const { destination, body } = req.body;
  const _id = uniqid();
  saveOnDatabase(_id, destination, body)
    .then(() => {
      setOnQueue(_id, destination, body);
      res.send({ messageID: _id });
    })
    .catch(err => {
      logger.error("Error while saving pending message");
    });
};

module.exports = startQueue;
