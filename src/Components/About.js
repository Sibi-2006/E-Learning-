import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-6">
          About Our E-Learning Platform
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-6">
          Welcome to our E-Learning platform — a free, modern, and interactive
          space built to help you master web development step by step. Whether
          you’re a complete beginner or looking to sharpen your coding skills,
          our lessons in{" "}
          <span className="text-blue-400 font-semibold">
            HTML, CSS, JavaScript, and the MERN Stack
          </span>{" "}
          are designed to make learning simple and fun.
        </p>
        <p className="text-lg text-gray-300 leading-relaxed mb-6">
          We believe in <span className="font-semibold">learning by doing</span>,
          so every topic includes clear explanations, sample code . Our goal is to make tech education{" "}
          <span className="text-blue-400 font-semibold">
            accessible to everyone
          </span>{" "}
          — no ads, no distractions, just pure learning.
        </p>
        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          With a clean UI, modern fonts like{" "}
          <span className="font-semibold">Poppins</span>,{" "}
          <span className="font-semibold">Inter</span>, and{" "}
          <span className="font-semibold">Fira Code</span>, our platform ensures
          a focused and enjoyable experience. Start your journey today and build
          the future you dream of —{" "}
          <span className="text-blue-400 font-semibold">
            one line of code at a time.
          </span>{" "}
          💻🚀
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl shadow-lg transition-all duration-300"
        >
          Start Learning
        </a>
      </div>
    </div>
  );
}
