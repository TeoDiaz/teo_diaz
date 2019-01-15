require("dotenv").config();

const mongoose = require("mongoose");
const primaryDB = process.env.MONGO_LOCAL_PRIMARY;
const replicaDB = process.env.MONGO_LOCAL_REPLICA;

const createCon = dbUrl => {
  return mongoose
    .createConnection(dbUrl, { useNewUrlParser: true })
    .then(conect => {
      conect.on("error", err => {
        if (err) `There was an ${err}`;
      });
      conect.on("connected", con => {
        console.log(
          `Connected to Mongo! Database name: "${con.name}"`
        );
      });
    });
};

const connection = () => {
  createCon(primaryDB);
  createCon(replicaDB);
};

module.exports = connection;
