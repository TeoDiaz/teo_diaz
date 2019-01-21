require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const messageValidated = require("./src/controllers/validations/messageValidations");
const creditValidated = require("./src/controllers/validations/creditValidation");
const getMessages = require("./src/database/getMessages");
const sendMessage = require("./src/controllers/sendMessage");
const creditBalance = require("./src/controllers/creditBalance");
const checkCredit = require("./src/controllers/checkCredit");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let locks = require("locks");
let mutex = locks.createMutex();

app.get("/", (req, res) =>
  res.status(200).send("This is my first, 'Hello World'")
);

app.get("/messages", (req, res) => getMessages(res));

app.post("/messages", (req, res) => {
  mutex.lock(function() {
    checkCredit().then(result => {
      if (result) {
        const { destination, body } = req.body;
        if (messageValidated(destination, body, res)) {
          creditBalance.creditMovements(-1);
          sendMessage(destination, body,res).then(response=>{
            mutex.unlock()
          })
        }
      } else {
        res.status(400).send("No credit avalible");
        mutex.unlock();
      }
    });
  });
});

app.post("/credit", (req, res) => {
  mutex.lock(function() {
    if (creditValidated(req, res)) {
      creditBalance
        .increase(req)
        .then(response => {
          res.status(200).send(`Your credit is: ${response.amount}`);
        })
        .catch(err => {
          console.log(err);
          res
            .status(500)
            .send("There was an error while updating your balance");
        });
    }
  });
});

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`I'm ready on port ${PORT}!`);
});
