const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("This is my first, 'Hello World'");
});

app.use("/messages", require("./client"));

app.listen(9001, () => {
  console.log("I'm ready on port 9001!");
});
