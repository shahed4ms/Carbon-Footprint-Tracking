const Activity = require("../models/Activity");
const calculateCarbon = require("../services/carbonCalculator");

// Add Activity
const addActivity = async (req, res) => {
  try {
    const { vehicle, distance, electricity, food } = req.body;

    // Validation
    if (
      !vehicle ||
      distance === undefined ||
      electricity === undefined ||
      !food
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const validVehicles = ["car", "bus", "bike"];

    const validFoods = ["vegetarian", "non-vegetarian"];

    if (!validVehicles.includes(vehicle)) {
      return res.status(400).json({
        message: "Invalid vehicle type",
      });
    }

    if (!validFoods.includes(food)) {
      return res.status(400).json({
        message: "Invalid food type",
      });
    }

    if (Number(distance) < 0 || Number(electricity) < 0) {
      return res.status(400).json({
        message: "Values cannot be negative",
      });
    }

    const carbonData = calculateCarbon({
      vehicle,
      distance,
      electricity,
      food,
    });

    const activity = await Activity.create({
      userId: req.user.id,
      vehicle,
      distance,
      electricity,
      food,
    });

    res.status(201).json({
      message: "Activity added successfully",
      activity,
      carbonData,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get User Activities
const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(activities);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  addActivity,
  getActivities,
};
