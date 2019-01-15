require("dotenv").config();

const mongoose = require("mongoose");

const primaryDB = process.env.MONGO_LOCAL_PRIMARY;
const replicaDB = process.env.MONGO_LOCAL_REPLICA;

const connection = (dbUrl) =>{
  return {
    primary: false,
    connected: true,
    connecton: mongoose.createConnection(dbUrl, {
      useNewUrlParser: true
    }).then(connection=>{console.log(connection.name)})
  }
}

const create = ()=>{
  return connections = [connection(primaryDB).primary = true,
  connection(replicaDB)]
}

module.exports = {
  connect : create(),
  checkDB:  () => console.log(create()) 
};
