import React from "react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-10">
        <h2 className="text-3xl font-bold text-[#c9184a] text-center mb-3">
          Contact Us
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Have questions or feedback? Fill out the form below and we’ll get back to you.
        </p>

        {submitted ? (
          <p className="text-center text-green-600 font-semibold">
            ✅ Thank you! We’ll be in touch soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c9184a]"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c9184a]"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c9184a]"
            />

            <button
              type="submit"
              className="w-full bg-[#c9184a] text-white font-bold py-3 rounded-lg hover:bg-[#a3133a] transition"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
