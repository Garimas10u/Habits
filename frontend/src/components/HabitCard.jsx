export default function HabitCard({ habit, onCheckin }) {
  return (
    <div className="border p-4 rounded flex justify-between items-center">
      <div>
        <h2 className="font-bold">{habit.name}</h2>
        <p className="text-sm text-gray-500">{habit.frequency} | {habit.category}</p>
      </div>
      <button onClick={onCheckin} className="bg-blue-500 text-white px-3 py-1 rounded">
        Check-in
      </button>
    </div>
  );
}
