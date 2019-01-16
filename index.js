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
const setOnQueue = require("./src/jobsQueue")


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) =>
  res.status(200).send("This is my first, 'Hello World'")
);

app.get("/messages", (req, res) => getMessages(res));

app.post("/messages", (req, res) => setOnQueue(req,res));

app.post("/credit", (req, res) => {
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

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`I'm ready on port ${PORT}!`);
});
