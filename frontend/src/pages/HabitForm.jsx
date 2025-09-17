import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function HabitForm({ onHabitCreated }) {
  const [form, setForm] = useState({
    name: "",
    frequency: "daily",
    category: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/habits", form);
      toast.success("Habit created successfully 🎯");
      setForm({ name: "", frequency: "daily", category: "" });
      onHabitCreated(data); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create habit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 mb-6"
    >
      <h2 className="text-xl font-semibold text-[#c9184a] mb-4">
        Create a New Habit
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          placeholder="Habit Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#c9184a]"
        />

        <select
          name="frequency"
          value={form.frequency}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#c9184a]"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>

        <input
          type="text"
          name="category"
          placeholder="Category (e.g., Health, Study)"
          value={form.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#c9184a]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full bg-[#c9184a] text-white font-semibold py-2 rounded hover:bg-[#a3153d] transition disabled:opacity-50"
      >
        {loading ? "Creating..." : "Add Habit"}
      </button>
    </form>
  );
}
