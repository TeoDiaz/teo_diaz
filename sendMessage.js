const axios = require('axios')

const sendMessage = (req) =>{
  const { destination, body } = req.body;
  return axios
    .post("http://teo_diaz_messageapp_1:3000/message", { destination, body })
  }

module.exports = sendMessage;
