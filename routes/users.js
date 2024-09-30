const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import User model

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

// Update username or password
// router.patch("/update", async (req, res) => {
//   try {
//     const { username, passwordNew, usernameNew } = req.body;

//     console.log("username:", username);
//     console.log("passwordNew:", passwordNew);
//     console.log("usernameNew:", usernameNew);

//     // Find the user by their current username
//     const userToUpdate = await User.findOne({ username });
//     if (!userToUpdate) {
//       return res
//         .status(404)
//         .json({ message: `User with username ${username} not found` });
//     }

//     // Update fields if they are provided
//     if (usernameNew) userToUpdate.username = usernameNew; // Update username if provided
//     if (passwordNew) userToUpdate.password = passwordNew; // Update password if provided

//     // Save the updated user
//     const updatedUser = await userToUpdate.save();

//     res.status(201).json({
//       message: `User updated successfully`,
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

module.exports = router;
