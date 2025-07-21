import axiosinstance from "../axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";



export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  const handlelogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      
     
      console.log("Login Success:", response.data);
      navigate("/Dashboard");
    } catch (error) {
      console.error("Login Failed:", error);
      alert("Invalid credentials or server error!");
    }
  };
  

  return (
    <div className="bg-white h-screen flex items-center justify-center">
      <div className="h-[280px] w-[300px] bg-gray-200 text-black p-[20px] rounded-md">
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
            />
            <label className="text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="mb-2 p-2 rounded bg-gray-700 text-white"
              required
            />
            <button
              type="submit"
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
