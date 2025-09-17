const Habit = require("../models/Habit");
const Checkin = require("../models/Checkin");

exports.getHabits = async (req, res) => {
  const habits = await Habit.find({ user: req.user._id });

  const enriched = await Promise.all(
    habits.map(async (habit) => {
      const checkins = await Checkin.find({
        habit: habit._id,
        user: req.user._id,
      }).sort({ date: -1 });

      let streak = 0;
      let lastCheckin = null;

      if (checkins.length > 0) {
        lastCheckin = checkins[0].date;

        let currentStreak = 1;
        for (let i = 1; i < checkins.length; i++) {
          const diff =
            (checkins[i - 1].date - checkins[i].date) / (1000 * 60 * 60 * 24);
          if (diff <= 1.5) currentStreak++;
          else break;
        }
        streak = currentStreak;
      }

      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); 

      const thisWeekCheckins = checkins.filter(
        (c) => new Date(c.date) >= startOfWeek
      ).length;

      let targetPerWeek = 7;
      if (habit.frequency === "weekly") targetPerWeek = 1;
      else if (habit.frequency === "monthly") targetPerWeek = 4;

      const progress = Math.min(
        Math.round((thisWeekCheckins / targetPerWeek) * 100),
        100
      );

      const today = new Date();
      const last14Days = [...Array(15)].map((_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (13 - i)); 
        const dateStr = d.toISOString().split("T")[0];

        const checked = checkins.some(
          (c) => new Date(c.date).toISOString().split("T")[0] === dateStr
        );

        return { date: dateStr, checked };
      });

      return {
        ...habit.toObject(),
        streak,
        lastCheckin,
        progress,
        calendar: last14Days,
      };
    })
  );

  res.json(enriched);
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
