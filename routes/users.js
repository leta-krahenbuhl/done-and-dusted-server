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

// Update user (just colour currently)
router.patch("/update", async (req, res) => {
  try {
    const { username, colourNew } = req.body;

    // Find the user by their current username
    const userToUpdate = await User.findOne({ username });
    if (!userToUpdate) {
      return res
        .status(404)
        .json({ message: `User with username ${username} not found` });
    }
    // Update colour
    if (colourNew) userToUpdate.colour = colourNew; // Update colour if provided

    // Save the updated user
    const updatedUser = await userToUpdate.save();
    res.status(204).json({
      message: `User updated successfully`,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
