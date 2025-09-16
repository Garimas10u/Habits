const express = require("express");
const { searchUsers, followUser, unfollowUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authMiddleware);

router.get("/search", searchUsers);
router.post("/follow/:id", followUser);
router.post("/unfollow/:id", unfollowUser);

module.exports = router;
