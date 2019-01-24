require("dotenv").config();
const Queue = require("bull");
const uniqid = require("uniqid");

const createMessage = require("../database/createMessage");
const transactionUpdate = require("../controllers/transactionUpdate");
const breaker = require("../controllers/breaker/breaker");
const { REDIS_PORT } = process.env;

const messageQueue = new Queue("charged-queue", `redis://${REDIS_PORT}`);
const creditQueue = new Queue("credit-queue", `redis://${REDIS_PORT}`);
const creditBackQueue = new Queue("creditBack-queue", `redis://${REDIS_PORT}`);

let openQueue = true;

const saveOnDatabase = (_id, destination, body) => {
  return createMessage("primary", _id, destination, body, "pending").then(
    () => {
      return createMessage("replica", _id, destination, body, "pending");
    }
  );
};

const errorCredit = data => {
  const { _id } = data.message;
  const paidError = data.type;
  transactionUpdate(_id, paidError);
};

messageQueue.process((job, done) => {
  const message = job.data.message;
  if (job.data.type == "OK") {
    breaker
      .fire(message)
      .then(response => {
        return transactionUpdate(message._id, response);
      })
      .then(() => {
        done();
      })
      .catch(err => {
        if (err != "Error: Timeout") {
          creditBackQueue.add({ amount: 1 });
        }
        transactionUpdate(message._id, err).then(() => {
          done();
        });
      });
  } else {
    errorCredit(job.data).then(() => done());
  }
});

const countingJobs = queue => {
  queue.count().then(num => {
    if (num > 5) {
      openQueue = false;
    } else {
      openQueue = true;
    }
  });
};

const setOnQueue = (_id, destination, body) => {
  if (openQueue) {
    creditQueue
      .add({ _id, destination, body })
      .then(() => countingJobs(creditBackQueue));
  } else {
    transactionUpdate(_id, "Message is busy, come back later");
  }
};

const startQueue = (req, res) => {
  const { destination, body } = req.body;
  const _id = uniqid();
  saveOnDatabase(_id, destination, body).then(() => {
    setOnQueue(_id, destination, body);
    res.send({ messageID: _id });
  });
};

module.exports = startQueue;