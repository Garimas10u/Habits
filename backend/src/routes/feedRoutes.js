const express = require("express");
const { getFriendsFeed, getFriendsStreaks } = require("../controllers/feedController.js");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authMiddleware);

router.get("/friends", getFriendsFeed);
router.get("/streaks", getFriendsStreaks);

module.exports = router;
