require("dotenv").config();

const express = require("express");
const app = express();

const creditValidated = require("./controllers/validations/creditValidation");
const creditBalance = require("./controllers/creditBalance");

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

const {PORT_CREDIT} = process.env
app.listen(PORT_CREDIT, () => {
  console.log(`I'm ready on port ${PORT_CREDIT}!`);
});