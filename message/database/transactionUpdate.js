const updateMessage = require("./updateMessage");

const transactionUpdate = (_id, status) => {
  return updateMessage("primary", _id, status).then(() => {
    return updateMessage("replica", _id, status);
  });
};

module.exports = transactionUpdate;
