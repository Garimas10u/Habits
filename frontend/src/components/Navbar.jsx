import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Friends Feed", path: "/friends" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center text-[#c9184a] font-bold text-xl">
            HabitTracker
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-[#c9184a] font-medium transition"
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="ml-4 px-6 py-1 rounded-2xl bg-[#c9184a] text-white hover:bg-[#a3153d] transition"
            >
              Logout
            </button>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-[#c9184a] hover:bg-gray-100 transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-[#c9184a] transition"
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-[#c9184a] hover:bg-[#a3153d] transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
