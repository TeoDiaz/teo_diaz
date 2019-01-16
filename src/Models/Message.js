const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connect = require('../database/connect')

const messageSchema = new Schema({
  _id: String,
  destination: String,
  body: String,
  status: String,
  confirm: {type:Boolean, default:true},
});

module.exports = (dbSelected) => connect.check(dbSelected).model("Message", messageSchema);



