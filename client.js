const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require("axios");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/", (req, res, next) => {
  const { destination, body } = req.body;
  axios
    .post("http://teo_diaz_messageapp_1:3000/message", { destination, body })
    .then(response => {
      res.send(`${response.data}`);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
