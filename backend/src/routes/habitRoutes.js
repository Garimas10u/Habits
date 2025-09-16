const express = require("express");
const {
  getHabits, createHabit, updateHabit, deleteHabit,
  checkinHabit, getCheckins
} = require("../controllers/habitController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authMiddleware);

router.get("/", getHabits);
router.post("/", createHabit);
router.put("/:id", updateHabit);
router.delete("/:id", deleteHabit);
router.post("/:id/checkin", checkinHabit);
router.get("/:id/checkins", getCheckins);

module.exports = router;
