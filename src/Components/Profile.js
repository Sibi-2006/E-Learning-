import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VariableContext } from "../Context/Variable";
import axios from "axios";
import { clearStorage } from "../storage";

export default function Profile() {
  const { id } = useParams();
  const { baseUrl } = useContext(VariableContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${baseUrl}/profile/${id}`);
        setUser(res.data.user);
      } catch (err) {
        console.log("Error on profile:", err);
      }
    };
    fetchUser();
  }, [baseUrl, id]);

  const handleLogOut = () => {
    clearStorage();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        Loading profile...
      </div>
    );
  }

  const { name, email, joinDate, progress } = user;

  return (
    <div className="flex pt-28 flex-col min-h-screen bg-gray-900 text-white px-6 md:px-20">
      {/* Header */}
      <h4 className="text-center text-primary font-bold text-3xl bg-gray-800 py-3 border-y-2 border-white">
        Profile
      </h4>

      {/* Profile Card */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6 mt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-primaryText mb-2">
              {name}
            </h1>
            <p className="text-gray-300">📧 {email}</p>
            <p className="text-gray-400 text-sm mt-1">
              Joined on: {new Date(joinDate).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={handleLogOut}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0 transition duration-300"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-gray-800 mt-6 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-primaryText mb-4">
          Learning Progress
        </h2>

        {progress ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(progress).map(([subject, data]) => (
              <div
                key={subject}
                className="bg-gray-700 rounded-xl p-4 flex flex-col gap-2"
              >
                <h3 className="text-lg font-semibold capitalize text-primary">
                  {subject}
                </h3>
                <p className="text-gray-300 text-sm">
                  Completed Lessons: {data.completedLessons} / {data.totalLessons}
                </p>
                <div className="w-full bg-gray-600 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-primary h-3 rounded-full"
                    style={{ width: `${data.percent}%` }}
                  ></div>
                </div>
                <p className="text-gray-400 text-xs mt-1">
                  Progress: {data.percent}%
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No progress data available.</p>
        )}
      </div>
    </div>
  );
}
