const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sendMessage = require("./sendMessage");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("This is my first, 'Hello World'");
});

app.post("/messages", (req, res) => {
  if (validated(req,res)){
    sendMessage(req)
      .then(response => res.status(200).send(`${response.data}`))
      .catch(err =>
        res.status(err.response.status).send(`There was an ${err}`)
      );
  }
});

app.listen(9001, () => {
  console.log("I'm ready on port 9001!");
});

const validated = ((req, res) => {
  const { destination, body } = req.body;
  if (destination == "" || destination == Number || body == "" || body == Number) {
   res.status(400).send("You must provide a valid destination and a valid message")
   return false
   }else{
     return true
   }
})
