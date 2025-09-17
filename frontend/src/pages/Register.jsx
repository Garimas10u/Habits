import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData.name, formData.email, formData.password);
      toast.success("🎉 Account created successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-[#c9184a] px-10 py-16 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center">Register</h2>
        <p className="text-white text-center mb-8">
          Create an account to start tracking your habits.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-100  focus:outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-100 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-[#c9184a]" />
              ) : (
                <Eye className="h-5 w-5 text-[#c9184a]" />
              )}
            </button>
          </div>

          {error && <p className="text-sm text-white text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#f5f1ed] text-[#c9184a] font-bold py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-white mt-4">
          Already have an account?{" "}
          <Link to="/login" className="underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
