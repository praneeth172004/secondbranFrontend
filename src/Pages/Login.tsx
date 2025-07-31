import axiosinstance from "../axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [loading, setLoading] = useState(false); // loader state

  const handlelogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // show loader
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const response = await axiosinstance.post(
        "/user/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      auth?.setisloggedin(true);

      setTimeout(() => {
        navigate("/Dashboard");
      }, 500); // optional delay for smooth transition
    } catch (error) {
      console.error("Login Failed:", error);
      alert("Invalid credentials or server error!");
      setLoading(false); // hide loader on failure
    }
  };

  return (
    <div className="bg-white h-screen flex items-center justify-center">
      <div className="relative h-[280px] w-[300px] bg-gray-200 text-black p-[20px] rounded-md">
        {loading && (
          <div className="absolute inset-0 bg-gray-300 bg-opacity-60 z-10 flex justify-center items-center rounded-md">
            <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        )}

        <div className="w-full text-[20px] font-bold flex justify-center mb-[10px]">Login</div>
        <div className="w-full mt-2">
          <form className="flex flex-col" onSubmit={handlelogin}>
            <label className="text-sm mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="mb-2 p-2 rounded bg-gray-700 text-white"
              required
              disabled={loading}
            />
            <label className="text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="mb-2 p-2 rounded bg-gray-700 text-white"
              required
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-blue-500 p-2 rounded text-white hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
