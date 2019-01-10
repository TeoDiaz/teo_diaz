require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sendMessage = require("./sendMessage");
const validated = require("./validations");
const connection = require("./database");
const createMessage = require("./createMessage");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

setTimeout(function() {
  connection();
}, 1000);

app.get("/", (req, res) => {
  res.send("This is my first, 'Hello World'");
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
          console.log("Error saving on DataBase");
        });

        res.status(err.response.status).send(err);
      });
  }
});
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`I'm ready on port ${PORT}!`);
});
