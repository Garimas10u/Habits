const User = require("../models/User");

exports.searchUsers = async (req, res) => {
  const { q } = req.query;
  const users = await User.find({
    $or: [{ name: new RegExp(q, "i") }, { email: new RegExp(q, "i") }]
  }).select("-password");
  res.json(users);
};

exports.followUser = async (req, res) => {
  if (req.user._id.toString() === req.params.id)
    return res.status(400).json({ message: "Cannot follow yourself" });

  await User.findByIdAndUpdate(req.user._id, { $addToSet: { friends: req.params.id } });
  res.json({ message: "Followed user" });
};

exports.unfollowUser = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $pull: { friends: req.params.id } });
  res.json({ message: "Unfollowed user" });
};
