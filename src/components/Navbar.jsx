import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="w-full bg-white shadow p-3 px-6 flex justify-between items-center mb-4">
      <h1 className="font-semibold text-xl">GoalToTasks.AI</h1>
      <button
        onClick={logout}
        className="text-sm px-3 py-1 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}
