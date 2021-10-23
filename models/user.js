const mongoose = require("mongoose");


const userSchema = mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    age: String,
    pass: String,
    email: { type: String, unique: true }, // Unique true will add
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
