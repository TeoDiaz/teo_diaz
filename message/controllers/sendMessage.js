require("dotenv").config();

const axios = require("axios");
const { API_URL } = process.env;

const sendMessage = data => {
  const { _id, destination, body } = data;
  return axios({
    method: "post",
    url: `${API_URL}`,
    timeout: "3000",
    data: { _id, destination, body }
  })
    .then(() => {
      return "Message sent";
    })
    .catch(err => {
      if (err.reponse == undefined) {
        throw new Error("Timeout");
      } else {
        throw new Error("Error sending message");
      }
    });
};

module.exports = sendMessage;
