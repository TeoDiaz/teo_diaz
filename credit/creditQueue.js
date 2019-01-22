require("dotenv").config();
const Queue = require("bull");

const { REDIS_LOCAL_PORT } = process.env;

const checkCredit = require("./controllers/checkCredit");

const creditQueue = new Queue("credit-queue", `redis://${REDIS_LOCAL_PORT}`);
const chargedQueue = new Queue("charged-queue", `redis://${REDIS_LOCAL_PORT}`);


creditQueue.process((job, done) => {
  checkCredit().then(paid=>{
    if(paid){
      chargedQueue.add(job.data)
      done()
    }else{
      done(new Error('Error while checking credit'));
    }
  })  
});
