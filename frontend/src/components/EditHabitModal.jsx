import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditHabitModal({ habit, onClose, onSave }) {
  const [name, setName] = useState(habit.name);
  const [frequency, setFrequency] = useState(habit.frequency);
  const [category, setCategory] = useState(habit.category || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `http://localhost:5000/api/habits/${habit._id}`,
        { name, frequency, category },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Habit updated successfully ✅");
      onSave(data);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update habit ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-pink-200/60 bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-[#c9184a]">Edit Habit</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Habit Name"
            className="w-full border rounded px-3 py-2 focus:ring-[#c9184a] focus:border-[#c9184a]"
            required
          />

          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:ring-[#c9184a] focus:border-[#c9184a]"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="w-full border rounded px-3 py-2 focus:ring-[#c9184a] focus:border-[#c9184a]"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-[#c9184a] text-white hover:bg-[#a3153d] disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
