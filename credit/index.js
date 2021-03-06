require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const creditValidated = require("./controllers/validations/creditValidation");
const creditBalance = require("./controllers/creditBalance");
const getCredit = require("./controllers/getCredit");
require("./jobs/creditQueue");
const logger = require("./logger");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/credit", (req, res) => {
  if (creditValidated(req)) {
    creditBalance
      .increase(req)
      .then(response => {
        logger.info("Sent credit without errors");
        res.status(200).send(`Your credit is: ${response.amount}`);
      })
      .catch(err => {
        logger.error("Error while updating balance");
        res.status(500).send("There was an error while updating your balance");
      });
  } else {
    res.status(400).send("Bad request");
  }
});

app.get("/credit", (req, res) => getCredit(res));

const { PORT_CREDIT } = process.env;
app.listen(PORT_CREDIT, () => {
  logger.info(`I'm ready on port ${PORT_CREDIT}!`);
});
