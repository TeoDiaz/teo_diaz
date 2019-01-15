require("dotenv").config();

const mongoose = require("mongoose");

const primaryDB = process.env.MONGO_LOCAL_PRIMARY;
const replicaDB = process.env.MONGO_LOCAL_REPLICA;

const connection = dbUrl => {
  return {
    primary: false,
    connected: true,
    connection: mongoose.createConnection(dbUrl, {
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

created.forEach(connect => {
  connect.connection.on("connected", () => {
    console.log("Database is connected correctly");
    console.log(connect.primary) 
  });
  
  
});

const checkConnected = (primaryDB, replica) => {
  primaryDB.connection.on("disconnected", () => {
    primaryDB.connected = false;
    if (primaryDB.primary) {
      primaryDB.primary = false;
      replica.primary = replica.connected;
    }
  });

  primaryDB.connection.on("reconnected", () => {
    primary.isActive = true;
    primary.isPrimary = !replica.isPrimary;
  });
};

checkConnected(created[0], created[1]);
checkConnected(created[1], created[0]);

module.exports = {
  connect: () => creatingConnection(),
  check: dbSelected => {
    let dbReturned;
    if (dbSelected == "primary") {
      dbReturned = created.find(db => db.primary == true);
    } else if (dbSelected == "replica") {
      dbReturned = created.find(db => db.primary == false);
    }

    return dbReturned.connection;
  }
};
