const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const addHomeRoute = require("./routes/home");
const addTaskRoute = require("./routes/tasks");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
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
app.use("/api/homes", addHomeRoute);
app.use("/api/tasks", addTaskRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
