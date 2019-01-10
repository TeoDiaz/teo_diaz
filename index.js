require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const validated = require("./validations");
const connection = require("./database/connect");
const createMessage = require("./database/createMessage");
const takeMessages = require("./database/takeMessages");
const sendMessage = require("./sendMessage");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

setTimeout(function() {
  connection();
}, 3000);

app.get("/", (req, res) => {
  res.status(200).send("This is my first, 'Hello World'");
});

app.get("/messages", (req, res) => {
  takeMessages()
    .then(messages => {
      res.status(200).send(messages);
    })
    .catch(err => {
      res.status(500).send(`There was an ${err}`);
    });
});

app.post("/messages", (req, res) => {
  const { destination, body } = req.body;
  if (validated(destination, body, res)) {
    sendMessage(destination, body)
      .then(response => {
        createMessage(destination, body, true).then(message => {
          console.log("Message saved on DataBase");
        });
        res.status(200).send(`${response.data}`);
      })
      .catch(err => {
        createMessage(destination, body, false).then(message => {
          console.log("Error sending Message");
        });
        res.status(err.response.status).send(err);
      });
  }
});
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`I'm ready on port ${PORT}!`);
});
