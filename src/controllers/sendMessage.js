require("dotenv").config();

const axios = require("axios");
const { API_URL } = process.env;
const createMessage = require("../database/createMessage");
const creditBalance = require("./creditBalance")

const sendMessage = (destination, body, res) => {
  return axios({
    method: "post",
    url: `${API_URL}`,
    timeout: "5000",
    data: { destination, body }
  })
    .then(response => {
      createMessage("primary", destination, body, true).then(message => {
        console.log("Message saved on DataBase");
        createMessage("replica", destination, body, true).then(message => {
          console.log("Also saved on Replica DataBase");
        });
      });
      res.status(200).send(`${response.data}`);
    })
    .catch(err => {
      if (err.response == undefined) {
        createMessage(destination, body, true, false).then(message => {
          res.status(504).send("Timeout");
        });
      } else {
        creditBalance.creditMovements(1);
        createMessage(destination, body, false).then(message => {
          res
            .status(`${err.response.status}`)
            .send(
              "There was an error sending message, the payment is returned"
            );
        });
      }
    });
};

module.exports = sendMessage;
