require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const getMessages = require("./database/getMessages");
const setOnQueue = require("./setOnQueue");
const getStatus = require("./database/getStatus");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) =>
  res.status(200).send("This is my first, 'Hello World'")
);

app.get("/messages", (req, res) => getMessages(res));

app.post("/messages", (req, res) => setOnQueue(req, res));

app.get("/messages/:id/status", (req, res) => {
  const { id } = req.params;
  getStatus(id)
    .then(response =>
      res.send(`The status of your message is: ${response.status}`)
    )
    .catch(err => res.send("Your ID doesn't correspond to any message"));
});

const { PORT_MESSAGE } = process.env;

app.listen(PORT_MESSAGE, () => {
  console.log(`I'm ready on port ${PORT_MESSAGE}!`);
});
