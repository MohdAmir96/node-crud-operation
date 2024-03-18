const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minLength: 3 },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (prop) => `${prop.value} is not a valid email!`,
    },
  },
  password: { type: String, required: true, minLength: 6 },
  token: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
