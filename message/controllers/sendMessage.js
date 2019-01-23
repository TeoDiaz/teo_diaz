require("dotenv").config();

const axios = require("axios");
const { API_URL } = process.env;

const updateMessage = require("./updateMessage");

const sendMessage = data => {
  const { _id, destination, body } = data;
  return axios({
    method: "post",
    url: `${API_URL}`,
    timeout: "5000",
    data: { _id, destination, body }
  })
    .then(response => {
      updateMessage("primary", _id, "Message sent").then(message => {
        console.log("Message saved on DataBase");
        updateMessage("replica", _id, "Message sent").then(message => {
          console.log("Also saved on Replica DataBase");
          return true;
        });
      });
    })
    .catch(err => {
      if (err.response == undefined) {
        updateMessage(
          "primary",
          _id,
          "Timeout: Message Sent without confirmation"
        ).then(message => {
          console.log("Message saved on DataBase");
          updateMessage(
            "replica",
            _id,
            "Timeout: Message Sent without confirmation"
          ).then(message => {
            console.log("Also saved on Replica DataBase");
            return true;
          });
        });
      } else {
        console.log(err.response);
        updateMessage("primary", _id, "Error sending message").then(message => {
          console.log("Message saved on DataBase");
          updateMessage("replica", _id, "Error sending message").then(
            message => {
              console.log("Also saved on Replica DataBase");
            }
          );
        });
      }
    });
};

module.exports = sendMessage;
