import { useEffect, useState } from "react";
import axiosinstance from "../axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axiosinstance.get("/user/details", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.status === 200) {
          setUsername(res.data.user.username);
          setEmail(res.data.user.email);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);
  const navigate=useNavigate();
 const handleLogout = async (e: any) => {
  e.preventDefault();

  try {
    

   
    localStorage.removeItem('token');

    alert("You successfully logged out");


    navigate('/login');
  } catch (err) {
    console.error("Logout failed:", err);
    alert("Logout failed. Please try again.");
  }
};


  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-gray-700 text-xl font-semibold">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-white to-gray-100 flex   flex-col justify-center items-center ">
      <div className="w-full h-[50px]  text-black text-[30px] font-bold text-center ">
        Second Brain
      </div>
      <div className="w-full max-w-md bg-blue-100 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
        <div className="flex flex-col items-center">
          {/* Profile Icon */}
          <div className="w-36 h-36 rounded-full bg-gray-100 shadow-md flex items-center justify-center mb-6">
            <FontAwesomeIcon icon={faUser} fontSize={100} />
          </div>

          {/* Profile Details */}
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Profile</h1>
          <div className="w-full bg-gray-100 rounded-lg p-5 shadow-inner space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
              <p className="text-lg font-semibold text-gray-800">{username}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <p className="text-base text-gray-700">{email}</p>
            </div>
          </div>
          <div className="bg-gray-100 mt-5 p-2 rounded-full hover:bg-blue-300 font-semibold cursor-pointer" onClick={handleLogout}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}
