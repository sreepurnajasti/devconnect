const mongoose = require("mongoose");
const schema = mongoose.Schema;
//user schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  active: { type: Boolean, default: false }
});

module.exports = User = mongoose.model("users", userSchema);
