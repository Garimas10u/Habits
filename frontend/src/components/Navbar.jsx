import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-[#c9184a] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-15">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-wide">
              HabitTracker
            </Link>
          </div>

          <div className="flex space-x-6 items-center">
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="hover:text-gray-200 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/feed"
                  className="hover:text-gray-200 transition-colors"
                >
                  Friends Feed
                </Link>
              </>
            )}

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-6 py-1 bg-white text-[#c9184a] font-semibold rounded-2xl shadow hover:bg-gray-100 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-1 border border-white text-white rounded-2xl shadow hover:bg-white hover:text-[#c9184a] transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-6 py-1 bg-white text-[#c9184a] font-semibold rounded-2xl shadow hover:bg-gray-100 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
