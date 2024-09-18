const express = require("express");
const router = express.Router();
const Task = require("../models/Task"); // Import Task model
const dotenv = require("dotenv");

router.use(express.json());
dotenv.config();

// Add Task Route
router.post("/", async (req, res) => {
  try {
    const {
      taskName,
      minutes,
      dateCreated,
      repeat,
      done,
      homeName,
      dueDate,
      week,
    } = req.body;

    // create a new task
    const newTask = new Task({
      taskName,
      minutes,
      dateCreated,
      repeat,
      done,
      homeName,
      dueDate,
      week,
    });
    await newTask.save();

    res.status(201).json({ message: `Task ${taskName} created successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get tasks of home for this week with repeat 'daily'
router.get("/daily", async (req, res) => {
  const { homeName, currentWeekISO } = req.query; // Get parameters from query string
  console.log("currentWeekISO: ", currentWeekISO);

  try {
    // Find tasks with the specified homeName and repeat set to 'daily'
    const tasks = await Task.find({
      homeName: homeName,
      repeat: "daily",
      week: currentWeekISO, // Is this right?
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
