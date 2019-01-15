require('dotenv').config();

const axios = require('axios')
const {API_URL} = process.env
const sendMessage = (destination, body) =>{
  return axios({ method:"post", url: `${API_URL}`, timeout: "5000", data:{destination, body} })
  }

module.exports = sendMessage;
