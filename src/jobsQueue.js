require("dotenv").config();
const Queue = require("bull");
const uniqid = require("uniqid");

const sendMessage = require("./controllers/sendMessage");
const creditBalance = require("./controllers/creditBalance");
const checkCredit = require("./controllers/checkCredit");
const createMessage = require("./database/createMessage");

const { REDIS_PORT } = process.env;

const messageQueue = new Queue(
  "message-queue",
  `redis://${REDIS_PORT}`
);

messageQueue.process((job, done) => {
  checkCredit(job.data._id).then(result => {
    if (result) {
      creditBalance.creditMovements(-1);
      sendMessage(job.data)
        .then(res => {
          done();
        })
        .catch(err => {
          creditBalance.creditMovements(1);
          done();
        });
    } else {
      done();
    }
  })
  throw new Error("An error occurred");
});

const startQueue = (req, res) => {
  const { destination, body } = req.body;
  const _id = uniqid();
  createMessage("primary", _id, destination, body, "pending");
  createMessage("replica", _id, destination, body, "pending");
  messageQueue.add({ _id, destination, body });
  res.send(`Your message is on queue with id: ${_id}`);
};

module.exports = startQueue;
