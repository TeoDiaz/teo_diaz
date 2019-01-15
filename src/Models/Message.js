const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connect = require('../database/connect')

const messageSchema = new Schema({
  destination: String,
  body: String,
  sent: Boolean,
  confirm: {type:Boolean, default:true}
});

module.exports = (dbSelected) => connect.check(dbSelected).model("Message", messageSchema);


