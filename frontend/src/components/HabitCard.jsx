import { CheckCircle, Flame, Calendar, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import EditHabitModal from "./EditHabitModal";

export default function HabitCard({ habit, onCheckin, onUpdate, onDelete }) {
  const today = new Date().toISOString().split("T")[0];

  const alreadyCheckedIn = habit.calendar?.some((c) => {
    const day = new Date(c.date).toISOString().split("T")[0];
    return day === today && c.checked;
  });

  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#c9184a]">{habit.name}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditOpen(true)}
                className="p-1 rounded hover:bg-gray-100 transition"
                title="Edit habit"
              >
                <Pencil size={16} className="text-gray-600" />
              </button>
              <button
                onClick={() => onDelete(habit._id)}
                className="p-1 rounded hover:bg-gray-100 transition"
                title="Delete habit"
              >
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>
          </div>

          <p className="text-gray-600 text-sm">
            Frequency:{" "}
            {habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)}
          </p>
          {habit.category && (
            <p className="text-gray-500 text-sm">Category: {habit.category}</p>
          )}

          <div className="mt-3 text-sm text-gray-700 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Flame className="text-orange-500" size={16} />
              <span>Streak: {habit.streak || 0} days</span>
            </div>
            {habit.lastCheckin && (
              <div className="flex items-center gap-2">
                <Calendar className="text-[#c9184a]" size={16} />
                <span>
                  Last check-in:{" "}
                  {new Date(habit.lastCheckin).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">Progress this week</span>
              <span className="font-medium">{habit.progress || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-[#c9184a] h-2.5 rounded-full transition-all"
                style={{ width: `${habit.progress || 0}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-5">
            <h4 className="text-sm font-medium mb-2">Last 14 Days</h4>
            <div className="grid grid-cols-8 gap-2">
              {habit.calendar?.map((day) => (
                <div
                  key={day.date}
                  title={day.date}
                  className={`w-6 h-6 rounded ${
                    day.checked ? "bg-[#c9184a]" : "bg-gray-200"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => onCheckin(habit._id)}
          disabled={alreadyCheckedIn}
          className={`mt-4 flex items-center justify-center gap-2 px-3 py-2 font-medium rounded transition ${
            alreadyCheckedIn
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-[#c9184a] text-white hover:bg-[#a3153d]"
          }`}
        >
          <CheckCircle size={18} />
          {alreadyCheckedIn ? "Already checked in" : "Check-in"}
        </button>
      </div>

      {isEditOpen && (
        <EditHabitModal
          habit={habit}
          onClose={() => setIsEditOpen(false)}
          onSave={onUpdate} 
        />
      )}
    </>
  );
}
