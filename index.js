require('dotenv').config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sendMessage = require("./sendMessage");
const validated = require('./validations')
const connection = require('./database')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connection()
app.get("/", (req, res) => {
  res.send("This is my first, 'Hello World'");
});

app.post("/messages", (req, res) => {
  if (validated(req,res)){
    
    sendMessage(req)
      .then(response => res.status(200).send(`${response.data}`))
      .catch(err =>
        res.status(err.response.status).send(err)
      );
  }
});
const {PORT} = process.env

app.listen(PORT, () => {
  console.log(`I'm ready on port ${PORT}!`);
});

