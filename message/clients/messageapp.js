require("dotenv").config();

const axios = require("axios");
const { API_URL } = process.env;

const sendMessage = data => {
  const { _id, destination, body } = data;
  return axios({
    method: "post",
    url: `${API_URL}`,
    timeout: "6000",
    data: { _id, destination, body }
  })
    .then(() => {
      return "Message sent";
    })
    .catch(err => {
      if (err.response == undefined) {
        throw new Error("Error: Tiemout in Messageapp");
      } else {
        throw new Error("Error sending message with Messageapp");
      }
    });
};

module.exports = sendMessage;
