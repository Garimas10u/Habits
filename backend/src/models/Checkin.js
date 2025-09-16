const mongoose = require("mongoose");

const checkinSchema = new mongoose.Schema({
  habit: { type: mongoose.Schema.Types.ObjectId, ref: "Habit", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

checkinSchema.index({ habit: 1, user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Checkin", checkinSchema);
