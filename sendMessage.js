const axios = require('axios')
const API_URL = 'http://teo_diaz_messageapp_1:3000/message'

const sendMessage = (destination, body) =>{
  return axios({ method:"post", url: API_URL, timeout: "5000", data:{destination, body} })
  }

module.exports = sendMessage;
