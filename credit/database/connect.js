require("dotenv").config();

const mongoose = require("mongoose");
const primaryDB = process.env.MONGO_CREDIT_URL_PRIMARY;
const replicaDB = process.env.MONGO_CREDIT_URL_REPLICA;

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
  checkConnected(created[0], created[1]);
  checkConnected(created[1], created[0]);
  created.forEach(connect => {
    connect.connection.on("connected", () => {
      console.log("Correct conexion");
    });
  });
};

const checkConnected = (primaryDB, replica) => {
  primaryDB.connection.on("disconnected", () => {
    primaryDB.connected = false;
    if (primaryDB.primary) {
      primaryDB.primary = false;
      replica.primary = replica.connected;
    }
  });

  primaryDB.connection.on("reconnected", () => {
    primaryDB.connected = true;
    db.copyDatabase(secondDB,firstDB)
    console.log(`${primaryDB} reconnected`)
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
