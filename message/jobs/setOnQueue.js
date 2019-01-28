require("dotenv").config();
const Queue = require("bull");

const transactionUpdate = require("../database/transactionUpdate");
const breaker = require("../clients/breaker/breaker");
const { REDIS_PORT } = process.env;

const messageQueue = new Queue("charged-queue", `redis://${REDIS_PORT}`);
const creditQueue = new Queue("credit-queue", `redis://${REDIS_PORT}`);
const creditBackQueue = new Queue("creditBack-queue", `redis://${REDIS_PORT}`);

const { MAX_JOBS, GOOD_JOBS } = process.env;
let openQueue = true;

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
  return queue.count().then(num => {
    if (num >= MAX_JOBS) {
      console.log("Queue busy");
      openQueue = false;
    } else if (num <= GOOD_JOBS) {
      console.log("Back to paradise");
      openQueue = true;
    }
  });
};

const setOnQueue = (_id, destination, body) => {
  countingJobs(creditQueue).then(() => {
    if (openQueue) {
      creditQueue.add({ _id, destination, body });
    } else {
      transactionUpdate(_id, "Message is busy, come back later");
    }
  });
};

module.exports = setOnQueue;
