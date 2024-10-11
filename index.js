const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const homesRoute = require("./routes/home");
const tasksRoute = require("./routes/tasks");
const usersRoute = require("./routes/users");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server only after successful connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the application if the connection fails
  });

// Middleware to parse JSON
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("Hello from the Done&Dusted server!");
});

// Routes
app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);
app.use("/api/homes", homesRoute);
app.use("/api/tasks", tasksRoute);
app.use("/api/users", usersRoute);
