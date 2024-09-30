const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import User model
const Task = require("../models/Task");

router.use(express.json());

// Get user
router.get("/get-one", async (req, res) => {
  const { username } = req.query; // Get parameters from query string

  try {
    // Find user with username
    const user = await User.find({
      username: username,
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get total minutes / week
router.get("/minutes", async (req, res) => {
  const { username, currentWeekISO } = req.query;

  // console.log("username: ", username); //works
  // console.log("currentWeekISO: ", currentWeekISO); //works

  try {
    // Find tasks with doneBy = username && week = currentWeekISO
    const tasks = await Task.find({
      doneBy: username,
      week: currentWeekISO,
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
