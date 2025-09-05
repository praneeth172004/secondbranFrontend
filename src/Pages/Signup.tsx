import { useNavigate } from "react-router-dom";
import axiosinstance from "../axios";
import React, { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false); // ✅ loader state
  const navigate = useNavigate();

  const handlesignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // start loader

    try {
      const response = await axiosinstance.post(
        "/user/signup",
        {
          username: form.username,
          password: form.password,
          email: form.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Signup Success:", response.data);
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup Failed:", error);
      alert(
        "Signup failed: Check if username is already taken or input is missing."
      );
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <div className="bg-white h-screen flex items-center justify-center">
      <div className="h-auto w-[300px] bg-gray-200 text-black p-[20px] rounded-md">
        <div className="w-full text-[20px] font-bold flex justify-center mb-[10px]">
          Signup
        </div>
        <div className="w-full mt-2">
          <form className="flex flex-col" onSubmit={handlesignup}>
            <label className="text-sm mb-1">Email</label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              className="mb-2 p-2 rounded bg-gray-700 text-white"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <label className="text-sm mb-1">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="mb-2 p-2 rounded bg-gray-700 text-white"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
            <label className="text-sm mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="mb-2 p-2 rounded bg-gray-700 text-white"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <button
              type="submit"
              disabled={loading} // disable while loading
              className="bg-blue-500 p-2 rounded text-white hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? "Signing up..." : "Signup"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="bg-blue-500 p-2 rounded text-white hover:bg-blue-600 mt-3"
            >
              Login
            </button>
          </form>

          {/* Loader below form */}
          {loading && (
            <div className="flex justify-center mt-3">
              <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
