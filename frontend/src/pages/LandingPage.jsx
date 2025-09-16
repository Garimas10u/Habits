import React from "react";
import { Link } from "react-router-dom";
import Contact from "./Contact";
import { BarChart, Handshake, Repeat } from "lucide-react";

export default function Landing() {
  return (
    <div className="flex flex-col bg-pink-50">
      <main className="flex flex-1 flex-col items-center justify-center text-center px-6 min-h-screen ">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#c9184a] mb-6">
          Build Better Habits Every Day
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-10">
          Track your progress, stay accountable, and transform your lifestyle
          with our simple yet powerful habit tracking dashboard.
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-[#c9184a] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-[#c9184a] transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="border border-[c9184a] text-[#c9184a] px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Login
          </Link>
        </div>
      </main>
      <section className="bg-pink-50 pb-16 pt-5 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#c9184a] mb-4">
            Why Choose HabitTracker?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Powerful features designed to help you stay consistent, accountable,
            and motivated every day.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#c9184a]/10 mx-auto mb-6">
                <span className="text-[#c9184a] text-2xl"><BarChart /></span>
              </div>
              <h3 className="text-xl font-semibold text-[#c9184a] mb-3">
                Track Progress
              </h3>
              <p className="text-gray-600">
                Visualize your journey with charts and insights to see how far
                you’ve come.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#c9184a]/10 mx-auto mb-6">
                <span className="text-[#c9184a] text-2xl"><Handshake /></span>
              </div>
              <h3 className="text-xl font-semibold text-[#c9184a] mb-3">
                Stay Accountable
              </h3>
              <p className="text-gray-600">
                Connect with friends and share progress to stay motivated
                together.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#c9184a]/10 mx-auto mb-6">
                <span className="text-[#c9184a] text-2xl"><Repeat /></span>
              </div>
              <h3 className="text-xl font-semibold text-[#c9184a] mb-3">
                Build Consistency
              </h3>
              <p className="text-gray-600">
                Form lasting habits with daily reminders, streaks, and
                motivational nudges.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-pink-50 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#c9184a] mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Choose the plan that fits your journey. No hidden fees, cancel
            anytime.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-[#c9184a] mb-4">
                Free
              </h3>
              <p className="text-gray-600 mb-6">
                For individuals starting their habit journey.
              </p>
              <p className="text-4xl font-bold text-[#c9184a] mb-6">
                $0<span className="text-lg">/mo</span>
              </p>
              <ul className="text-gray-600 space-y-3 mb-6">
                <li>✔ Track up to 3 habits</li>
                <li>✔ Basic progress stats</li>
                <li>✔ Community access</li>
              </ul>
              <button className="mt-auto bg-[#c9184a] text-white font-bold py-3 rounded-lg hover:bg-[#a3133a] transition">
                Get Started
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border-2 border-[#c9184a] p-8 flex flex-col hover:shadow-xl transition scale-105">
              <h3 className="text-xl font-semibold text-[#c9184a] mb-4">Pro</h3>
              <p className="text-gray-600 mb-6">
                Perfect for committed habit builders.
              </p>
              <p className="text-4xl font-bold text-[#c9184a] mb-6">
                $9<span className="text-lg">/mo</span>
              </p>
              <ul className="text-gray-600 space-y-3 mb-6">
                <li>✔ Unlimited habits</li>
                <li>✔ Advanced streak tracking</li>
                <li>✔ Friends activity feed</li>
              </ul>
              <button className="mt-auto bg-[#c9184a] text-white font-bold py-3 rounded-lg hover:bg-[#a3133a] transition">
                Start Pro
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-[#c9184a] mb-4">
                Premium
              </h3>
              <p className="text-gray-600 mb-6">
                For power users & accountability groups.
              </p>
              <p className="text-4xl font-bold text-[#c9184a] mb-6">
                $19<span className="text-lg">/mo</span>
              </p>
              <ul className="text-gray-600 space-y-3 mb-6">
                <li>✔ All Pro features</li>
                <li>✔ Team challenges</li>
                <li>✔ Personalized reminders</li>
                <li>✔ Priority support</li>
              </ul>
              <button className="mt-auto bg-[#c9184a] text-white font-bold py-3 rounded-lg hover:bg-[#a3133a] transition">
                Go Premium
              </button>
            </div>
          </div>
        </div>
      </section>
      <Contact />
      <footer className="bg-[#c9184a] text-white py-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} HabitTracker. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
