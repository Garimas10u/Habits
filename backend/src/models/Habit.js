const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  frequency: { type: String, enum: ["daily", "weekly"], required: true },
  category: { type: String },
}, { timestamps: true });

habitSchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Habit", habitSchema);
