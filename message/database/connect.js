require("dotenv").config();

const mongoose = require("mongoose");
const primaryDB = process.env.MONGO_MESSAGE_URL_PRIMARY;
const replicaDB = process.env.MONGO_MESSAGE_URL_REPLICA;

const connection = (dbUrl, primary=false) => {
  return {
    primary,
    connected: true,
    connection: mongoose.createConnection(dbUrl, {
      useNewUrlParser: true
    })
  };
};

let created = [];

creatingConnection = () => {
  created = [connection(primaryDB,true), connection(replicaDB)];
  checkConnected(created[0], created[1]);
  checkConnected(created[1], created[0]);
  
  created.forEach(connect => {
    connect.connection.on("connected", () => {
      console.log("Correct conexion");
    });
  });
};

const checkConnected = (firstDB, secondDB) => {
  firstDB.connection.on("disconnected", () => {
    firstDB.connected = false;
    if (firstDB.primary) {
      firstDB.primary = false;
      secondDB.primary = secondDB.connected;
    }
  });

  firstDB.connection.on("reconnected", () => {
    firstDB.connected = true;
    db.copyDatabase(secondDB,firstDB)
    console.log(`${firstDB} reconnected`)
  });
};

  creatingConnection();

module.exports = {
  check: dbSelected => {
    let dbReturned;
    if (dbSelected == "primary") {
      dbReturned = created.find(db => db.primary == true);
    } else if (dbSelected == "replica") {
      dbReturned = created.find(db => db.primary == false);
    }
    return dbReturned.connection;
  },
  isReplica: () => {
    return created[0].connected && created[1].connected;
  }
};
