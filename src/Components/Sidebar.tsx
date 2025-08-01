import { BsTwitter, BsYoutube } from "react-icons/bs";
import { HiDocument } from "react-icons/hi";
import { IoLinkSharp } from "react-icons/io5";
import SidebarButton from "./SidebarButton";
import sidebarimage from "../assets/sidebarimage.webp";
import { MdDoneAll } from "react-icons/md";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

interface SidebarProps {
  choice: string | undefined;
  setchoice: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function Sidebar({ choice, setchoice }: SidebarProps) {
  const [open, setOpen] = useState(false); // For mobile view

  useEffect(() => {
    const saved = localStorage.getItem("choice");
    if (saved) setchoice(saved);
  }, [setchoice]);

  const handleClick = (value: string) => {
    setchoice(value);
    localStorage.setItem("choice", value);
    setOpen(false); // close on mobile when selecting
  };

  return (
    <>
      {/* Toggle Button for small devices */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow-md"
        onClick={() => setOpen(!open)}
      >
        {open ? <IoClose size={24} /> : <RxHamburgerMenu size={24} />}
      </button>

      {/* Sidebar for large and small screens */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[260px] bg-white shadow-md border-r border-gray-200 z-40 transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:relative lg:flex lg:flex-col`}
      >
        {/* App Logo and Title */}
        <div className="text-2xl font-bold text-gray-800 mb-8 p-6 select-none text-center">
          <div className="flex justify-center mb-2">
            <img src={sidebarimage} alt="logo" className="w-[70px] h-[70px]" />
          </div>
          <div>Second Brain</div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4 px-6">
          <SidebarButton
            variant={choice === "all" ? "selected" : "primary"}
            size="large"
            text="All"
            StartIcon={<MdDoneAll />}
            onClick={() => handleClick("all")}
          />
          <SidebarButton
            variant={choice === "twitter" ? "selected" : "primary"}
            size="large"
            text="Twitter"
            StartIcon={<BsTwitter size={22} className="text-[#1DA1F2]" />}
            onClick={() => handleClick("twitter")}
          />
          <SidebarButton
            variant={choice === "youtube" ? "selected" : "primary"}
            size="large"
            text="YouTube"
            StartIcon={<BsYoutube size={22} className="text-[#FF0000]" />}
            onClick={() => handleClick("youtube")}
          />
          
          <SidebarButton
            variant={choice === "article" ? "selected" : "primary"}
            size="large"
            text="Links"
            StartIcon={<IoLinkSharp size={22} className="text-gray-700" />}
            onClick={() => handleClick("article")}
          />
        </nav>

        {/* Footer */}
        <div className="mt-auto text-xs text-gray-400 text-center p-6">
          © {new Date().getFullYear()} Second Brain
        </div>
      </aside>

      {/* Overlay when sidebar is open on mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}
