require("dotenv").config();

const axios = require("axios");
const { API_LOCAL_URL } = process.env;

const creditBalance = require("./creditBalance");
const updateMessage = require('./updateCredit')

const sendMessage = (data) => {
  const {_id,destination, body} = data
  return axios({
    method: "post",
    url: `${API_LOCAL_URL}`,
    timeout: "5000",
    data: { _id,destination, body }
  })
    .then(response => {
      updateMessage("primary", destination, body, true).then(message => {
        console.log("Message saved on DataBase");
        updateMessage("replica", destination, body, true).then(message => {
          console.log("Also saved on Replica DataBase");
        });
      });
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
