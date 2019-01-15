require('dotenv').config();

const axios = require('axios')
const {API_LOCAL_URL} = process.env
const sendMessage = (destination, body) =>{
  return axios({ method:"post", url: `${API_LOCAL_URL}`, timeout: "5000", data:{destination, body} })
  }

module.exports = sendMessage;
