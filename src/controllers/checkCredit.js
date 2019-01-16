const Credit = require("../Models/Credit");
const updateMessage = require("./updateMessage");

const checkCredit = (_id) => {
  return Credit("primary")
    .find()
    .then(credit => {
      if (credit == undefined) {
        return credit[0].amount > 0 ? true : false;
      }
      updateMessage("primary", _id, "Error: No credit available").then(message => {
        console.log("Message saved on DataBase");
        updateMessage("replica", _id, "Error: No credit available").then(message => {
          console.log("Also saved on Replica DataBase");
        });
      });
    });
};

module.exports = checkCredit;
