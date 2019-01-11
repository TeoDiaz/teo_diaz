const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  destination: String,
  body: String,
  sent: Boolean,
  confirm: {type:Boolean, default:true}
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
