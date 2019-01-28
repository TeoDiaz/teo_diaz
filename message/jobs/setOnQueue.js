require("dotenv").config();
const Queue = require("bull");

const transactionUpdate = require("../database/transactionUpdate");
const breaker = require("../clients/breaker/breaker");
const { REDIS_PORT } = process.env;
const logger = require("../logger");

const messageQueue = new Queue("charged-queue", `redis://${REDIS_PORT}`);
const creditQueue = new Queue("credit-queue", `redis://${REDIS_PORT}`);
const creditBackQueue = new Queue("creditBack-queue", `redis://${REDIS_PORT}`);

const { MAX_JOBS, GOOD_JOBS } = process.env;
let openQueue = true;
let prevNum = 0;

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
        logger.info("Message sent succesfully");
        done();
      })
      .catch(err => {
        if (err != "Error: Timeout") {
          creditBackQueue.add({ amount: 1 });
          logger.error(`${err}`);
        } else {
          logger.error(`${err}`);
        }
        transactionUpdate(message._id, err).then(() => {
          done();
        });
      });
  } else {
    errorCredit(job.data).then(() => done());
  }
});

const increasing = num => {
  prevNum++;
  if (prevNum < num) {
    prevNum = num;
    if (prevNum > 7) {
      logger.warn("Queue is getting busy");
    }
  } else {
    prevNum = 0;
  }
};

const countingJobs = queue => {
  return queue.count().then(num => {
    increasing(num);
    if (num >= MAX_JOBS) {
      logger.error("The sending queue is busy I'm not accepting more request");
      openQueue = false;
    } else if (num <= GOOD_JOBS) {
      logger.info("Queue stack back to normal activity");
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
