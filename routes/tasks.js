const express = require("express");
const router = express.Router();
const Task = require("../models/Task"); // Import Task model
const dotenv = require("dotenv");

router.use(express.json());
dotenv.config();

// Add task route
router.post("/", async (req, res) => {
  try {
    const { taskName, minutes, repeat, done, homeName, dueDate, week } =
      req.body;

    // create a new task
    const newTask = new Task({
      taskName,
      minutes,
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

// Edit a task route
router.patch("/edit", async (req, res) => {
  try {
    const { taskName, minutes, repeat, dueDate, taskId } = req.body;

    // Find the task by ID and update it
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        taskName,
        minutes,
        repeat,
        dueDate,
        taskId,
      },
      { new: true, runValidators: true } // Return the updated task and run validations
    );

    // If task is not found
    if (!updatedTask) {
      return res
        .status(404)
        .json({ message: `Task with ID ${taskId}not found` });
    }

    res
      .status(200)
      .json({
        message: `Task ${taskName} updated successfully`,
        task: updatedTask,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get tasks of home for this week with repeat 'daily' and done: false
router.get("/daily-undone", async (req, res) => {
  const { homeName, currentWeekISO } = req.query; // Get parameters from query string

  try {
    // Find tasks with the specified homeName and repeat set to 'daily'
    const tasks = await Task.find({
      homeName: homeName,
      repeat: "daily",
      week: currentWeekISO,
      done: false,
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get tasks of home for this week with repeat 'weekly'
router.get("/weekly", async (req, res) => {
  const { homeName, currentWeekISO } = req.query; // Get parameters from query string

  try {
    // Find tasks with the specified homeName and repeat set to 'daily'
    const tasks = await Task.find({
      homeName: homeName,
      repeat: "weekly",
      week: currentWeekISO,
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get tasks of home for this week with repeat 'other'
router.get("/other", async (req, res) => {
  const { homeName, currentWeekISO } = req.query; // Get parameters from query string

  try {
    // Find tasks with the specified homeName and repeat set to 'other'
    const tasks = await Task.find({
      homeName: homeName,
      repeat: "other",
      week: currentWeekISO,
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
