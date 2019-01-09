const axios = require("axios").create({
  baseURL: "http://localhost:9001/"
});

class Client {
  sendRequest(tryNum, method, url, timeout, data) {
    return axios({method,url,timeout,data})
      .then(response => console.log(tryNum, response.data))
      .catch(err => console.log(tryNum, `There was an ${err}`));
  }
}

module.exports = new Client();
