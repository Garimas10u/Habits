const Habit = require("../models/Habit");
const Checkin = require("../models/Checkin");

exports.getHabits = async (req, res) => {
  const habits = await Habit.find({ user: req.user._id });
  res.json(habits);
};

exports.createHabit = async (req, res) => {
  try {
    const { name, frequency, category } = req.body;
    const habit = await Habit.create({ user: req.user._id, name, frequency, category });
    res.json(habit);
  } catch (err) {
    res.status(400).json({ message: "Habit already exists or invalid" });
  }
};

exports.updateHabit = async (req, res) => {
  const habit = await Habit.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  res.json(habit);
};

exports.deleteHabit = async (req, res) => {
  await Habit.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.json({ message: "Habit deleted" });
};

exports.checkinHabit = async (req, res) => {
  const habit = await Habit.findOne({ _id: req.params.id, user: req.user._id });
  if (!habit) return res.status(404).json({ message: "Habit not found" });

  const today = new Date();
  const start = habit.frequency === "daily"
    ? new Date(today.getFullYear(), today.getMonth(), today.getDate())
    : new Date(today.setDate(today.getDate() - today.getDay()));

  const exists = await Checkin.findOne({
    habit: habit._id,
    user: req.user._id,
    date: { $gte: start }
  });

  if (exists) return res.status(400).json({ message: "Already checked in" });

  const checkin = await Checkin.create({ habit: habit._id, user: req.user._id });
  res.json(checkin);
};

exports.getCheckins = async (req, res) => {
  const checkins = await Checkin.find({ habit: req.params.id, user: req.user._id });
  res.json(checkins);
};
