const axios = require("axios");

const testQueue = () => {
  const req = {
      destination: "User",
      body: "Test for multiple messages"
  };

  axios({
    method: "post",
    url: "http://localhost:9001/messages",
    timeout: "5000",
    json: true,
    headers: {
      "Content-Type": "application/json"
    },
    data: req
  })
};

for(let i =0;i<20;i++){
  testQueue();
}


