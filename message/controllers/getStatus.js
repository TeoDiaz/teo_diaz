const getStatus = require("../clients/getStatus");

module.exports = (req, res) => {
  const { id } = req.params;
  getStatus(id)
    .then(response =>
      res.send(`The status of your message is: ${response.status}`)
    )
    .catch(err => res.send("Your ID doesn't correspond to any message"));
};
