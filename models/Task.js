const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  taskName: { type: String, required: true },
  minutes: { type: Number, required: true },
  repeat: { type: String, required: true },
  done: { type: Boolean, required: true },
  doneBy: { type: String },
  homeName: { type: String, required: true },
  dueDate: { type: String, required: true },
  week: { type: String, required: true },
});

module.exports = mongoose.model("Task", taskSchema);
