import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function FriendsFeed() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch current logged-in user
  const fetchCurrentUser = async () => {
    try {
      const { data } = await api.get("/auth/me");
      setCurrentUser(data);
    } catch (err) {
      toast.error("Failed to load current user");
    }
  };

  // Fetch all users
  const fetchUsers = async (query = "") => {
    try {
      const { data } = await api.get(`/users/search?q=${query}`);
      setUsers(data);
    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchUsers(e.target.value);
  };

  const handleFollowToggle = async (userId) => {
    if (!currentUser) return;

    if (currentUser._id === userId) return; // Cannot follow yourself

    const isFollowing = currentUser.friends?.includes(userId);

    try {
      await (isFollowing
        ? api.post(`/users/unfollow/${userId}`)
        : api.post(`/users/follow/${userId}`));

      toast.success(isFollowing ? "Unfollowed user" : "Followed user");

      // Update currentUser friends list immediately
      setCurrentUser((prev) => ({
        ...prev,
        friends: isFollowing
          ? prev.friends.filter((id) => id !== userId)
          : [...(prev.friends || []), userId],
      }));

      // Update users array for immediate UI change
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, followed: !isFollowing } : u
        )
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to follow/unfollow");
    }
  };

  // Sort users: followed first (by streak descending), then others
  const sortedUsers = [...users].sort((a, b) => {
    const aFollowed = currentUser?.friends?.includes(a._id) ? 1 : 0;
    const bFollowed = currentUser?.friends?.includes(b._id) ? 1 : 0;

    if (aFollowed && bFollowed) {
      const aMaxStreak = Math.max(...(a.habits?.map((h) => h.streak || 0) || [0]));
      const bMaxStreak = Math.max(...(b.habits?.map((h) => h.streak || 0) || [0]));
      return bMaxStreak - aMaxStreak;
    }

    return bFollowed - aFollowed;
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#c9184a]">Friends Feed</h1>

      <input
        type="text"
        placeholder="Search friends..."
        value={search}
        onChange={handleSearch}
        className="w-full mb-6 px-4 py-2 border rounded focus:ring-[#c9184a] focus:border-[#c9184a]"
      />

      {sortedUsers.length === 0 ? (
        <p className="text-gray-600">No users found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedUsers.map((user) => {
            const isFollowing = currentUser?.friends?.includes(user._id);
            const isMe = currentUser?._id === user._id;

            return (
              <div
                key={user._id}
                className={`bg-white shadow-md rounded-lg p-4 flex flex-col justify-between ${
                  isMe ? "border-2 border-[#c9184a]" : ""
                }`}
              >
                <div>
                  <h3 className="text-lg font-bold text-[#c9184a]">
                    {user.name} {isMe && "(You)"}
                  </h3>
                  <p className="text-gray-500 text-sm">{user.email}</p>

                  {user.habits?.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium mb-1">Habits</h4>
                      {user.habits.map((habit) => (
                        <div
                          key={habit._id}
                          className="text-gray-700 text-sm flex justify-between"
                        >
                          <span>{habit.name}</span>
                          <span className="font-medium">{habit.streak || 0} 🔥</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {!isMe && (
                  <button
                    onClick={() => handleFollowToggle(user._id)}
                    className={`mt-4 px-4 py-2 rounded font-medium transition ${
                      isFollowing
                        ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
                        : "bg-[#c9184a] text-white hover:bg-[#a3153d]"
                    }`}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
