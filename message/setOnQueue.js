require("dotenv").config();
const Queue = require("bull");
const uniqid = require("uniqid");

const sendMessage = require("./controllers/sendMessage");
const createMessage = require("./database/createMessage");

const { REDIS_LOCAL_PORT } = process.env;

const chargedQueue = new Queue("charged-queue", `redis://${REDIS_LOCAL_PORT}`);
const creditQueue = new Queue("credit-queue", `redis://${REDIS_LOCAL_PORT}`);
const creditBackQueue = new Queue('creditBack-queue', `redis://${REDIS_LOCAL_PORT}`)

const saveOnDatabase = (_id, destination, body) => {
  return createMessage("primary", _id, destination, body, "pending").then(() =>
    createMessage("replica", _id, destination, body, "pending")
  );
};

chargedQueue.process((job, done) => {
  sendMessage(job.data).then(response => {
  response ? done() : creditBackQueue.add({amount:1})
  });
  done();
});

const startQueue = (req, res) => {
  const { destination, body } = req.body;
  const _id = uniqid();
  saveOnDatabase(_id, destination, body).then(() => {
    creditQueue.add({ _id, destination, body });
    res.send({ messageID: _id });
  });
};

module.exports = startQueue;
