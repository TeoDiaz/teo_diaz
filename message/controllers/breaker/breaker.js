const circuitBreaker = require("opossum");
const sendMessage = require("../sendMessage");
const options = {
  timeout: 10000,
  errorThresholdPercentage: 50,
  resetTimeout: 3000
};

const breaker = circuitBreaker(sendMessage, options);


module.exports = breaker;
