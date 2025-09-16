import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-[#c9184a] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
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
                  className="hover:text-[#c9184a] transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/feed"
                  className="hover:text-[#c9184a] transition-colors"
                >
                  Friends Feed
                </Link>
              </>
            )}

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-white text-[#c9184a] font-semibold rounded hover:bg-orange-100 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 border border-white rounded hover:bg-[#c9184a] transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white text-[#c9184a] font-semibold rounded hover:bg-orange-100 transition"
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
