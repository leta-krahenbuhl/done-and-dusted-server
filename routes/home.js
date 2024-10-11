const express = require("express");
const router = express.Router();
const Home = require("../models/Home"); // Import Home model
const Task = require("../models/Task"); // Import Task model

// const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

router.use(express.json());
dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET;

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
    console.error("Error creating home:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get home of user
router.get("/user-home", async (req, res) => {
  try {
    const { username } = req.query; // Use req.query for GET request parameters

    // Find a home where the user is listed as a habitant
    const home = await Home.findOne({ habitants: username });

    if (home) {
      return res.json({ homeName: home.homeName });
    } else {
      return res.json({ homeName: "" });
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

    // Check if the newHabitant is already part of any home
    const existingHome = await Home.findOne({ habitants: newHabitant });

    if (existingHome) {
      return res.status(400).json({
        message: `User ${newHabitant} is already part of another home. Currently you can only be part of one home.`,
      });
    }

    // Find the home by homeName and push the newHabitant into the habitants array
    const updatedHome = await Home.findOneAndUpdate(
      { homeName: homeName }, // Find the home by homeName
      { $push: { habitants: newHabitant } }, // Push newHabitant into the habitants array
      { new: true } // Return the updated document
    );

    // If homeName is not found
    if (!updatedHome) {
      return res.status(404).json({ message: `${homeName} not found` });
    }

    res.status(200).json({
      message: `Habitant ${newHabitant} added successfully to ${homeName}.`,
      home: updatedHome, // Return the updated home object
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete habitant from home (and also delete all of this habitant's tasks)
router.patch("/delete-habitant", async (req, res) => {
  try {
    const { username, homeName } = req.body;

    // Find the home by homeName
    const home = await Home.findOne({ homeName: homeName });

    // If home is not found
    if (!home) {
      return res.status(404).json({ message: `${homeName} not found.` });
    }

    // Proceed to delete the habitant
    const updatedHome = await Home.findOneAndUpdate(
      { homeName: homeName }, // Find the home by homeName
      { $pull: { habitants: username } }, // Remove the habitnat with username from habitants array
      { new: true } // Return the updated document
    );

    // If deletion was not successful
    if (!updatedHome) {
      return res.status(404).json({
        message: `${username} could not be deleted from ${homeName}.`,
      });
    }

    // Find all tasks done by the habitant being removed
    const tasksToDelete = await Task.find({ doneBy: username });

    // Delete the tasks after finding them
    await Task.deleteMany({ doneBy: username });

    // Check if there is only one habitant left
    // if (home.habitants.length === 1 && home.habitants[0] === username) {
    //   return res.status(400).json({
    //     message: `Cannot delete the last habitant (${username}) from ${homeName}. If you would like to remove yourself from this home, please go to your account and edit it there.`,
    //   });
    // }

    res.status(200).json({
      message: `Habitant ${username} deleted successfully.`,
      home: updatedHome, // Return the updated home object
      deletedTasks: tasksToDelete, // Return the deleted tasks
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
