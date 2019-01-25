const circuitBreaker = require("opossum");
const messageapp = require("../messageapp");

const options = {
  timeout: 10000,
  errorThresholdPercentage: 50,
  resetTimeout: 3000
};

const breaker = circuitBreaker(messageapp, options);

breaker.on("open", () => console.log("Breaker is open"));
breaker.on("success", () => console.log("Job success"));
breaker.on("timeout", () => console.log("Timeout error"));

module.exports = breaker;
