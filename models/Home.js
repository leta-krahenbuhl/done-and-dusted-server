const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homeSchema = new Schema({
  homeName: { type: String, required: true, unique: true },
  habitants: { type: String, required: true },
  admins: { type: String, required: true },
});

module.exports = mongoose.model("Home", homeSchema);
