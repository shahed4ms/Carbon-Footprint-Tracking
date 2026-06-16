const express = require("express");

const {
  addActivity,
  getActivities,
} = require("../controllers/activityController");

const auth = require("../middleware/auth");

const router = express.Router();

router.post("/add", auth, addActivity);
router.get("/history", auth, getActivities);

module.exports = router;
