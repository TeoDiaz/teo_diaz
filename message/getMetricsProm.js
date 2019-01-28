const Register = require("prom-client").register;
const Counter = require("prom-client").Counter;
const Summary = require("prom-client").Summary;
const ResponseTime = require("response-time");
const logger = require("./logger");

const numOfRequests = new Counter({
  name: "numOfRequests",
  help: "Number of requests made",
  labelNames: ["method"]
});

const pathsTaken = new Counter({
  name: "pathsTaken",
  help: "Paths taken in the app",
  labelNames: ["path"]
});

const responses = new Summary({
  name: "responses",
  help: "Response time in millis",
  labelNames: ["method", "path", "status"]
});

const requestCounters = (req, res) => {
  if (req.path != "/metrics") {
    numOfRequests.inc({ method: req.method });
    pathsTaken.inc({ path: req.path });
  }
};

const responseCounters = ResponseTime(function(req, res, time) {
  if (req.url != "/metrics") {
    responses.labels(req.method, req.url, res.statusCode).observe(time);
  }
});

const startCollection = () => {
  logger.info(
    `Starting the collection of metrics, the metrics are available on /metrics`
  );
  require("prom-client").collectDefaultMetrics();
};

const getMetrics = () => {
  res.set("Content-Type", Register.contentType);
  res.end(Register.metrics());
};

module.exports = {
  numOfRequests,
  pathsTaken,
  responses,
  requestCounters,
  responseCounters,
  startCollection,
  getMetrics
};
