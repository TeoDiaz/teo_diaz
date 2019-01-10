const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  destination: String,
  body: String,
  sent: Boolean
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
