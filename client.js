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
      res.status(200).send(`${response.data}`);
    })
    .catch(err => {
     res.status(500).send(`There was an Error: ${err}`)
    });
});

module.exports = router;
