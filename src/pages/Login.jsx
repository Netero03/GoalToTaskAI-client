import React, { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  if (localStorage.getItem("token")) {
  return <Navigate to="/" />;
  }


  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow space-y-3"
      >
        <h1 className="text-2xl font-semibold mb-4">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-3 rounded disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-sm text-center mt-3">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600">Sign up</Link>
        </div>
      </form>
      {/* Bottom right alert */}
      <div className="fixed bottom-4 right-4 max-w-xs bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded shadow-lg text-sm z-50">
        <div className="font-semibold mb-1">Note</div>
        <div>
          If logging in takes a while, please wait a few seconds for the server to start (Render free tier may sleep when idle).
        </div>
        <div className="mt-2">
          <span className="font-semibold">Example login:</span><br/>
          Email: <span className="font-mono">user@example.com</span><br/>
          Password: <span className="font-mono">password</span>
        </div>
      </div>
    </div>
  );
}
