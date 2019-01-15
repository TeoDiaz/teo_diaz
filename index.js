require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const messageValidated = require("./src/controllers/validations/messageValidations");
const creditValidated = require("./src/controllers/validations/creditValidated");
const createMessage = require("./src/database/saveMessage");
const getMessages = require("./src/database/getMessages");
const sendMessage = require("./src/controllers/sendMessage");
const creditBalance = require("./src/controllers/creditBalance");
const checkCredit = require("./src/controllers/checkCredit");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let locks = require("locks");
let mutex = locks.createMutex();

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
  mutex.lock(function() {
    // if (result) {
    const { destination, body } = req.body;
    if (messageValidated(destination, body, res)) {
      creditBalance.creditMovements(-1);
      sendMessage(destination, body)
        .then(response => {
          createMessage("primary", destination, body, true).then(message => {
            console.log("Message saved on DataBase");
            createMessage("replica", destination, body, true);
            mutex.unlock();
          });
          res.status(200).send(`${response.data}`);
        })
        .catch(err => {
          if (err.response == undefined) {
            createMessage(destination, body, true, false).then(message => {
              res.status(504).send("Timeout");
              mutex.unlock();
            });
          } else {
            creditBalance.creditMovements(1);
            createMessage(destination, body, false).then(message => {
              res
                .status(`${err.response.status}`)
                .send(
                  "There was an error sending message, the payment is returned"
                );
              mutex.unlock();
            });
          }
        });
    }
    // } else {
    //   res.status(400).send("No credit avalible");
    //   mutex.unlock();
    // }
  });
});

app.post("/credit", (req, res) => {
  mutex.lock(function() {
    if (creditValidated(req, res)) {
      creditBalance
        .increase(req)
        .then(credit => {
          res.status(200).send(`Now your credit is: ${credit.amount}`);
          mutex.unlock();
        })
        .catch(err => {
          res
            .status(400)
            .send("There was an error while registering your credit");
          mutex.unlock();
        });
    }
  });
});

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`I'm ready on port ${PORT}!`);
});
