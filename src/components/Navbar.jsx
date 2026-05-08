import React from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./Common/ThemeToggle";

export default function Navbar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div
      className="w-full p-3 px-6 flex justify-between items-center mb-4 border-b"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
        boxShadow: "var(--shadow-soft)"
      }}
    >
      <div className="flex items-center gap-3">
        <img src="/G2T.png" alt="GoalToTasks.AI Logo" className="h-8 w-auto" />
        <h1 className="font-semibold text-xl" style={{ color: "var(--color-text)" }}>
          GoalToTasks.AI
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button
          onClick={logout}
          className="text-sm px-3 py-1 rounded text-white"
          style={{ backgroundColor: "var(--color-danger)" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
