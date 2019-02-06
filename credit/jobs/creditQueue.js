require("dotenv").config();
const Queue = require("bull");

const { REDIS_PORT } = process.env;

const checkCredit = require("../database/checkCredit");
const updateCredit = require("../database/updateCredit");

const creditQueue = new Queue("credit-queue", `redis://${REDIS_PORT}`);
const messageQueue = new Queue("charged-queue", `redis://${REDIS_PORT}`);
const creditBackQueue = new Queue("creditBack-queue", `redis://${REDIS_PORT}`);

creditQueue.process((job, done) => {
  checkCredit().then(paidRes => {
    messageQueue.add({ message: job.data, type: paidRes });
    done();
  });
});

creditBackQueue.process((job, done) => {
  const data = { amount: job.data.amount } ;
  updateCredit(data).then(() => done());
});
