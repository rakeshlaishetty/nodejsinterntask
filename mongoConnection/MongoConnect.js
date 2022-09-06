const mongoose = require("mongoose");

module.exports = mongoose
  .connect("mongodb+srv://admin:admin@nodjsintern.sk0aqen.mongodb.net/test")
  .then((res) => {
    console.log("Mongodb COnnected");
  })
  .catch((err) => {
    console.log(err);
  });
