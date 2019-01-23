require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const getMessages = require("./controllers/getMessages");
const startQueue = require("./jobs/startQueue");
const getStatus = require("./controllers/getStatus");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) =>
  res.status(200).send("This is my first, 'Hello World'")
);

app.get("/messages", (req, res) => getMessages(res));

app.post("/messages", (req, res) => startQueue(req, res));

app.get("/messages/:id/status", (req, res) => getStatus(req, res));

const { PORT_MESSAGE } = process.env;

app.listen(PORT_MESSAGE, () => {
  console.log(`I'm ready on port ${PORT_MESSAGE}!`);
});
