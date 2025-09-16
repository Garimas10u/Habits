import { useEffect, useState } from "react";
import api from "../api/axios";

export default function FriendFeed() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    api.get("/feed/friends").then(({ data }) => setFeed(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Friends Feed</h1>
      {feed.map((c) => (
        <div key={c._id} className="border p-3 rounded mb-2">
          <p>
            <strong>{c.user?.name}</strong> checked in: <em>{c.habit?.name}</em>
          </p>
        </div>
      ))}
    </div>
  );
}
