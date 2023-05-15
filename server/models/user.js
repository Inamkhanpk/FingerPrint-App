const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// define schema for processing in mongodn fields
const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UserData", User);
