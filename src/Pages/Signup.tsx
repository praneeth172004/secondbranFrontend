import { useNavigate } from "react-router-dom";
import axiosinstance from "../axios";
import React, { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email:" "
  });
  const navigate=useNavigate();
  const handlesignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axiosinstance.post(
        "/user/signup",
        {
          username: form.username,
          password: form.password,
          email:form.email
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Signup Success:", response.data);
      alert("Signup successful!");
      navigate("/login")
    } catch (error) {
      console.error("Signup Failed:", error);
      alert("Signup failed: Check if username is already taken or input is missing.");
    }
  };
 

  return (
    <div className="bg-white h-screen flex items-center justify-center">
      <div className="h-auto w-[300px] bg-gray-200 text-black p-[20px] rounded-md">
        <div className="w-full text-[20px] font-bold flex justify-center mb-[10px]">Signup</div>
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
              
              className="bg-blue-500 p-2 rounded text-white hover:bg-blue-600"
            >
              Signup
            </button>
            <button
              type="submit"
              onClick={()=>navigate("/login")}
              className="bg-blue-500 p-2 rounded text-white hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
