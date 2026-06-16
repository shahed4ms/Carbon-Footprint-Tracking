const Activity = require("../models/Activity");
const calculateCarbon = require("../services/carbonCalculator");

// Add Activity
const addActivity = async (req, res) => {
  try {
    const { vehicle, distance, electricity, food } = req.body;

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
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get User Activities
const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({
      userId: req.user.id,
    });

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addActivity,
  getActivities,
};
