const express = require("express");
const router = express.Router();
const Home = require("../models/Home"); // Import Home model
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

router.use(express.json());
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Add Home Route
router.post("/", async (req, res) => {
  try {
    const { homeName, habitants, admins } = req.body;

    // Check if home already exists
    const existingHome = await Home.findOne({ homeName });
    if (existingHome) {
      return res.status(400).json({ message: "Home name already exists" });
    }

    // create a new home
    const newHome = new Home({ homeName, habitants, admins });
    await newHome.save();

    res.status(201).json({ message: "Home created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get home of user
router.get("/user-home", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Extract token from Authorization header
    const decoded = jwt.verify(token, JWT_SECRET); // Use your JWT secret to verify the token
    const username = decoded.username;

    // Find a home where the user is listed as a habitant
    const home = await Home.findOne({ habitants: username });

    if (home) {
      return res.json({ homeName: home.homeName });
    } else {
      return res.status(404).json({ message: "User is not part of any home." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Get home object by homeName
router.get("/get-current", async (req, res) => {
  try {
    const { homeName } = req.query; // Use req.query for GET request parameters
    console.log("homeName: ", homeName);

    // Find a home where the homeName matches
    const home = await Home.findOne({ homeName: homeName });

    if (home) {
      return res.json(home);
    } else {
      return res.status(404).json({ message: `Home ${homeName} not found.` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Add habitant to home
router.patch("/add-habitant", async (req, res) => {
  try {
    const { newHabitant, homeName } = req.body;
    console.log("newHabitant: ", newHabitant);
    console.log("homeName: ", homeName);

    // Find the home by homeName and push the newHabitant into the habitants array
    const updatedHome = await Home.findOneAndUpdate(
      { homeName: homeName }, // Find the home by homeName
      { $push: { habitants: newHabitant } }, // Push newHabitant into the habitants array
      { new: true } // Return the updated document
    );

    // If homeName is not found
    if (!homeName) {
      return res.status(404).json({ message: `${homeName} not found` });
    }

    res.status(200).json({
      message: `Habitant ${newHabitant} added successfully.`,
      home: updatedHome, // Return the updated home object
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
