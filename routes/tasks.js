const express = require("express");
const router = express.Router();
const Task = require("../models/Task"); // Import Task model
const dotenv = require("dotenv");

router.use(express.json());
dotenv.config();

// Add Task Route
router.post("/", async (req, res) => {
  try {
    const { taskName, minutes, dateCreated, repeat, done, homeName } = req.body;

    // create a new task
    const newTask = new Task({
      taskName,
      minutes,
      dateCreated,
      repeat,
      done,
      homeName,
    });
    await newTask.save();

    res.status(201).json({ message: `Task ${taskName} created successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
