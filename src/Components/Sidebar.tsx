import { BsTwitter, BsYoutube } from 'react-icons/bs';
import { HiDocument } from 'react-icons/hi';
import { IoLinkSharp } from 'react-icons/io5';
import SidebarButton from './SidebarButton';
import sidebarimage from "../assets/sidebarimage.webp";
import { MdDoneAll } from 'react-icons/md';
import { useEffect } from 'react';

interface SidebarProps {
  choice: string | undefined;
  setchoice: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function Sidebar({ choice, setchoice }: SidebarProps) {
  // Load saved choice on mount
  useEffect(() => {
    const saved = localStorage.getItem("choice");
    if (saved) setchoice(saved);
  }, [setchoice]);

  // Helper to update state and localStorage together
  const handleClick = (value: string) => {
    setchoice(value);
    localStorage.setItem("choice", value);
  };

  return (
    <aside className="h-screen w-[280px] justify-between border-r border-gray-200 bg-white shadow-sm p-6 flex flex-col">
      {/* App Title */}
      <div className="text-2xl font-bold text-gray-800 mb-10 select-none w-full text-center">
        <div className="flex justify-center mb-2">
          <img src={sidebarimage} alt="logo" className="w-[80px] h-[80px]" />
        </div>
        <div>Second Brain</div>
      </div>

      {/* Navigation Buttons */}
      <nav className="flex flex-col gap-4">
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
          variant={choice === "pdf" ? "selected" : "primary"}
          size="large"
          text="Documents"
          StartIcon={<HiDocument size={22} className="text-gray-700" />}
          onClick={() => handleClick("pdf")}
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
      <div className="mt-auto text-xs text-gray-400 text-center">
        © {new Date().getFullYear()} Second Brain
      </div>
    </aside>
  );
}
