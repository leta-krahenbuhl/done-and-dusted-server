const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import User model

router.use(express.json());

// Get user
router.get("/colour", async (req, res) => {
  const { username } = req.query; // Get parameters from query string

  try {
    // Find tasks with the specified homeName and repeat set to 'daily'
    const user = await User.find({
      username: username,
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
