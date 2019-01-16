require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const creditValidated = require("./src/controllers/validations/creditValidation");
const getMessages = require("./src/database/getMessages");
const creditBalance = require("./src/controllers/creditBalance");
const setOnQueue = require("./src/jobsQueue")
const getStatus = require('./src/database/getStatus')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) =>
  res.status(200).send("This is my first, 'Hello World'")
);

app.get("/messages", (req, res) => getMessages(res));

app.post("/messages", (req, res) => setOnQueue(req,res));

app.get('/messages/:id/status',(req,res) => getStatus(req,res))

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
