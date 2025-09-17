const User = require("../models/User");
const Habit = require("../models/Habit");

exports.searchUsers = async (req, res) => {
  try {
    const { q } = req.query;

    const users = await User.find({
      $or: [{ name: new RegExp(q, "i") }, { email: new RegExp(q, "i") }]
    })
      .select("-password")
      .lean();

   
    const usersWithHabits = await Promise.all(
      users.map(async (user) => {
        const habits = await Habit.find({ user: user._id }).select("name streak");
        return { ...user, habits };
      })
    );

    res.json(usersWithHabits);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

exports.followUser = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id)
      return res.status(400).json({ message: "Cannot follow yourself" });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { friends: req.params.id } },
      { new: true }
    );

    res.json(user); 
  } catch (err) {
    res.status(500).json({ message: "Failed to follow user" });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { friends: req.params.id } },
      { new: true }
    );

    res.json(user); 
  } catch (err) {
    res.status(500).json({ message: "Failed to unfollow user" });
  }
};
