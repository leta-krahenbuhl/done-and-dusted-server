const express = require("express");
const router = express.Router();
const Home = require("../models/Home"); // Import Home model

router.use(express.json());

// Add Home Route
router.post("/", async (req, res) => {
  try {
    const { homeName, habitants, admins } = req.body;

    // Check if home already exists
    const existingHome = await Home.findOne({ homeName });
    if (existingHome) {
      return res.status(400).json({ message: "Home name already exists" });
    }

    // Create a new home
    const newHome = new Home({ homeName, habitants, admins });
    await newHome.save();

    res.status(201).json({ message: "Home created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
