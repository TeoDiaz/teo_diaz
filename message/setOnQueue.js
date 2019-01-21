require("dotenv").config();
const Queue = require("bull");
const uniqid = require("uniqid");

const sendMessage = require("./controllers/sendMessage");
const createMessage = require("./database/createMessage");

const { REDIS_LOCAL_PORT } = process.env;

const messageQueue = new Queue("message-queue", `redis://${REDIS_LOCAL_PORT}`);

const creditQueue = new Queue("credit-queue", `redis://${REDIS_LOCAL_PORT}`);

messageQueue.process((job, done) => {
  creditQueue.add({cost:-1})
  sendMessage(job.data)
    .then(res => {
      done();
    })
    .catch(err => {
      console.log(err.error)
      done();
    });
  throw new Error("An error occurred");
});


const startQueue = (req, res) => {
  const { destination, body } = req.body;
  const _id = uniqid();
  createMessage("primary", _id, destination, body, "pending");
  createMessage("replica", _id, destination, body, "pending");

  messageQueue.add({ _id, destination, body });
  res.send({ messageID: _id });
};

module.exports = startQueue;
