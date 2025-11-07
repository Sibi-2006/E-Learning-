import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { VariableContext } from "../Context/Variable";

export default function Footer() {
  const { appName } = useContext(VariableContext);
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10 border-t border-gray-700">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left — App Name */}
        <h2
          className="text-primaryText font-bold text-xl cursor-pointer hover:text-primary transition"
          onClick={() => navigate("/")}
        >
          {appName}
        </h2>

        {/* Center — Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <button
            onClick={() => navigate("/")}
            className="hover:text-primary transition"
          >
            Home
          </button>
          
          
          <button
            onClick={() => navigate("/about")}
            className="hover:text-primary transition"
          >
            About
          </button>
        </div>

        {/* Right — Copy */}
        <p className="text-xs text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} {appName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
