require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const creditValidated = require("./controllers/validations/creditValidation");
const creditBalance = require("./controllers/creditBalance");
const getCredit = require("./clients/getCredit");
require("./jobs/creditQueue");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/credit", (req, res) => {
  if (creditValidated(req)) {
    creditBalance
      .increase(req)
      .then(response => {
        res.status(200).send(`Your credit is: ${response.amount}`);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("There was an error while updating your balance");
      });
  }else{
    res.status(400).send("Bad request")
  }
});

app.get("/credit", (req, res) => {
  getCredit()
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      console.log(err);
    });
});

const { PORT_CREDIT } = process.env;
app.listen(PORT_CREDIT, () => {
  console.log(`I'm ready on port ${PORT_CREDIT}!`);
});
