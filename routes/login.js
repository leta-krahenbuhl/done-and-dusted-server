const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import User model
const bcrypt = require("bcrypt"); // Import bcrypt
const jwt = require("jsonwebtoken");

router.use(express.json());

// Log-In Route
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username }, // Include the username in the token
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
