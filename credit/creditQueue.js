require("dotenv").config();
const Queue = require("bull");

const { REDIS_LOCAL_PORT } = process.env;

const updateCredit = require('./controllers/updateCredit')

const creditQueue = new Queue("credit-queue", `redis://${REDIS_LOCAL_PORT}`);

creditQueue.process((job, done) => {
  updateCredit(job.data.cost).then(response =>{
    console.log(response)
    return response
  }).then(()=>done())
});




