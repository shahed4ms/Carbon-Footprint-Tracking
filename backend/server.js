const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const activityRoutes = require("./routes/activityRoutes");

const app = express();

// Security Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "EcoTrack API Running",
    status: "OK",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/activity", activityRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// MongoDB Connection + Server Start
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database Connection Error:", error.message);

    process.exit(1);
  }
};

startServer();
