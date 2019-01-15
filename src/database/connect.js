require("dotenv").config();

const mongoose = require("mongoose");

const primaryDB = process.env.MONGO_LOCAL_PRIMARY;
const replicaDB = process.env.MONGO_LOCAL_REPLICA;

const connection = dbUrl => {
  return {
    primary: false,
    connected: true,
    connecton: mongoose.createConnection(dbUrl, {
      useNewUrlParser: true
    })
  };
};
let created = [];
creatingConnection = () => {
  created = [connection(primaryDB), connection(replicaDB)];
  created[0].primary = true;
};
creatingConnection();
setTimeout(function() {}, 0);

module.exports = {
  connect: () => creatingConnection(),
  check: dbSelected => {
    let dbReturned;
    if (dbSelected == "primary") {
      dbReturned = created.find(db => (db.primary == true));
    } else if (dbSelected == "replica") {
      dbReturned = created.find(db => (db.primary == false));
    }
   
    return dbReturned.connecton;
  }
};
