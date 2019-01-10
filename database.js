require('dotenv').config();

const mongoose = require("mongoose");

const connection = () =>{
mongoose
  .connect(`${process.env.MONGO_URL}`, { useNewUrlParser: true } )
  .then(conect => {
    console.log(`Connected to Mongo! Database name: "${conect.connections[0].name}"`)
  })
  .catch(err => console.error(`Have a connecting error: ${err}`));
}

module.exports = connection