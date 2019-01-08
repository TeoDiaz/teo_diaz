const axios = require('axios')
const API_URL = 'http://teo_diaz_messageapp_1:3000/message'

const sendMessage = (req) =>{
  const { destination, body } = req.body;
  return axios
    .post(API_URL, { destination, body })
  }

module.exports = sendMessage;
