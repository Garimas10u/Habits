import { useEffect, useState } from "react";
import api from "../api/axios";
import HabitCard from "../components/HabitCard";
import HabitForm from "./HabitForm";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    try {
      const { data } = await api.get("/habits");
      setHabits(data);
    } catch {
      toast.error("Failed to load habits");
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const checkin = async (id) => {
    try {
      await api.post(`/habits/${id}/checkin`);
      toast.success("Habit checked in 🎉");
      fetchHabits();
    } catch (err) {
      toast.error(err.response?.data?.message || "Already checked in!");
    }
  };

  const handleHabitCreated = (newHabit) => {
    setHabits((prev) => [...prev, newHabit]);
  };

  const handleHabitUpdated = (updatedHabit) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit._id === updatedHabit._id ? { ...habit, ...updatedHabit } : habit
      )
    );
  };

  const handleHabitDelete = async (habitId) => {
  try {
    await api.delete(`/habits/${habitId}`);
    toast.success("Habit deleted ");
    setHabits((prev) => prev.filter((habit) => habit._id !== habitId));
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to delete habit ");
  }
};

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#c9184a]">My Habits</h1>

      <HabitForm onHabitCreated={handleHabitCreated} />

      {habits.length === 0 ? (
        <p className="text-gray-600">No habits yet. Start by creating one!</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map((habit) => (
            <HabitCard
              key={habit._id}
              habit={habit}
              onCheckin={() => checkin(habit._id)}
              onUpdate={handleHabitUpdated}
              onDelete={handleHabitDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
