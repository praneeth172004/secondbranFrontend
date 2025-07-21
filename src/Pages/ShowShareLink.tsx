import React, {  useState } from 'react';

interface ShowShareLinkProps {
  share: boolean;
  setshare: React.Dispatch<React.SetStateAction<boolean>>;
  link: string;
  setlink: React.Dispatch<React.SetStateAction<string>>;
}

function ShowShareLink({ share, setshare, link }: ShowShareLinkProps) {
    
     const [copyMessage, setCopyMessage] = useState("");
    
  if (!share) return null;
  const url="https://second-brain-frontend-zruo.vercel.app/"
  
  const fullLink = `${url}${link}`;

  return (
    <div className="fixed top-0 left-0 flex backdrop-blur-sm bg-black/50 h-screen w-screen justify-center items-center z-50 transition-all duration-700 ease-in-out ">
      <div className="bg-white rounded-lg w-[500px] p-10 shadow-lg transition-all  flex flex-col gap-5 h-[280px]">
        <label htmlFor="ShareLink" className="text-lg text-black font-bold">Shareable Link</label>
        <input
          id="ShareLink"
          type="text"
          readOnly
          value={fullLink}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 shadow-inner"
        />
        <button
          onClick={() => {navigator.clipboard.writeText(fullLink)
            setCopyMessage("Copied Successfully ✅");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Copy Link
        </button>
        {copyMessage && <p className="text-green-600 font-medium">{copyMessage}</p>}
        <button
          onClick={() => { setshare(false); setCopyMessage(""); }}
          className="text-red-600 hover:underline  self-end"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ShowShareLink;
