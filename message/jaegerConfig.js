const PrometheusMetricsFactory = require("jaeger-client")
  .PrometheusMetricsFactory;
const initTracer = require("jaeger-client").initTracer;
const promClient = require("prom-client");

const config = {
  serviceName: "My MessageApp"
};
const namespace = config.serviceName;
const metrics = new PrometheusMetricsFactory(promClient, namespace);
const options = {
  metrics: metrics
};
const tracer = initTracer(config, options);

module.exports = tracer