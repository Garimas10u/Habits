import { useEffect, useState } from "react";
import api from "../api/axios";
import HabitCard from "../components/HabitCard";

export default function Dashboard() {
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    const { data } = await api.get("/habits");
    setHabits(data);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const checkin = async (id) => {
    try {
      await api.post(`/habits/${id}/checkin`);
      fetchHabits();
    } catch {
      alert("Already checked in!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Habits</h1>
      <div className="grid gap-4">
        {habits.map((habit) => (
          <HabitCard key={habit._id} habit={habit} onCheckin={() => checkin(habit._id)} />
        ))}
      </div>
    </div>
  );
}
