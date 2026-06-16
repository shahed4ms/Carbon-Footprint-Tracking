const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    vehicle: String,
    distance: Number,
    electricity: Number,
    food: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Activity", activitySchema);
