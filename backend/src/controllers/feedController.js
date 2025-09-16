const Checkin = require("../models/Checkin");
const User = require("../models/User");

exports.getFriendsFeed = async (req, res) => {
  const user = await User.findById(req.user._id);
  const checkins = await Checkin.find({ user: { $in: user.friends } })
    .populate("habit user")
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(checkins);
};

exports.getFriendsStreaks = async (req, res) => {
  const user = await User.findById(req.user._id);
  const streaks = await Checkin.aggregate([
    { $match: { user: { $in: user.friends } } },
    { $group: { _id: "$user", streak: { $sum: 1 } } }
  ]);
  res.json(streaks);
};
