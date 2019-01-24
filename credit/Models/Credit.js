const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connect = require('../database/connect')

const creditSchema = new Schema({
  amount:Number,
});

module.exports = (dbSelected) => connect.check(dbSelected).model("Credit", creditSchema);