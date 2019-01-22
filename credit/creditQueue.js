require("dotenv").config();
const Queue = require("bull");

const { REDIS_PORT } = process.env;

const updateCredit = require("./controllers/updateCredit");
const checkCredit = require("./controllers/checkCredit");

const creditQueue = new Queue("credit-queue", `redis://${REDIS_PORT}`);

creditQueue.process((job, done) => {
  checkCredit().then(response => {
    if (response) {
      updateCredit(job.data)
        .then(response => {
          console.log(response);
          return response;
        })
        .then(() => done());
    }
  });
});