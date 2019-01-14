require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const validated = require("./src/controllers/validations");
const connection = require("./src/database/connect");
const createMessage = require("./src/database/saveMessage");
const getMessages = require("./src/database/getMessages");
const sendMessage = require("./src/controllers/sendMessage");
const creditBalance = require("./src/controllers/creditBalance");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

setTimeout(function() {
  connection();
}, 3000);

app.get("/", (req, res) => {
  res.status(200).send("This is my first, 'Hello World'");
});

app.get("/messages", (req, res) => {
  getMessages()
    .then(messages => {
      if (messages.length == 0) {
        res.status(500).send("DataBase is empty");
      } else {
        res.status(200).send(messages);
      }
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
          if (err.response == undefined) {
            createMessage(destination, body, true, false).then(message => {
              res.status(504).send("Timeout");
            });
          } else {
            createMessage(destination, body, false).then(message => {
              res
                .status(`${err.response.status}`)
                .send("Error sending message");
            });
          }
        });
    }
  
});

app.post("/credit", (req, res) => {
  creditBalance(req).then(credit => {
    res.send(credit);
  });
});

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`I'm ready on port ${PORT}!`);
});
