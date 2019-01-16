require("dotenv").config();

const axios = require("axios");
const { API_LOCAL_URL } = process.env;

const creditBalance = require("./creditBalance");
const updateMessage = require("./updateMessage");

const sendMessage = data => {
  const { _id, destination, body } = data;
  return axios({
    method: "post",
    url: `${API_LOCAL_URL}`,
    timeout: "5000",
    data: { _id, destination, body }
  })
    .then(response => {
      updateMessage("primary", _id, "send").then(message => {
        console.log("Message saved on DataBase");
        updateMessage("replica", _id, "send").then(message => {
          console.log("Also saved on Replica DataBase");
        });
      });
    })
    .catch(err => {
      if (err.response == undefined) {
      } else {
        creditBalance.creditMovements(1);
      }
    });
};

module.exports = sendMessage;
