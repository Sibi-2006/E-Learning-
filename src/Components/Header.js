import React, { useContext, useEffect, useState } from "react";
import { VariableContext } from "../Context/Variable";
import { useNavigate } from "react-router-dom";
import { getUser } from "../storage";

export default function Header() {
  const { appName } = useContext(VariableContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser());

  const userId = user?.id || user?._id;

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getUser());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    setUser(getUser());
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/register");
  };

  return (
    <div className="fixed top-0 w-full z-50">
      <nav className="bg-primary py-3 px-3 flex flex-row justify-between items-center shadow-md backdrop-blur-md">
        {/* Logo / App Name */}
        <div>
          <h1
            className="text-primaryText text-xl md:text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            {appName}
          </h1>
        </div>

        {/* Right Section */}
        {!userId ? (
          <button
            className="primary-btn"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              className="primary-btn"
              onClick={() => navigate(`/profile/${userId}`)}
            >
              Profile
            </button>
            <button className="primary-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}
