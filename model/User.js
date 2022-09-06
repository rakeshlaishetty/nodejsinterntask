const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
});

module.exports = mongoose.model("User", UserSchema);
