const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    max: 50,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
