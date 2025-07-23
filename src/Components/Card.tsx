import { BsTwitter, BsYoutube } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import axiosinstance from '../axios';

interface CardProps {
  _id: string;
  title: string;
  link: string;
  content: string;
  type: string;
  tags: string[];
  createdAt: string;
  OnDelete?: (id: string) => void;
  fileUrl: string;
}

export default function Card({
  _id,
  title,
  link,
  content,
  type,
  tags,
  createdAt,
  OnDelete,
  fileUrl,
}: CardProps) {
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  const handleDelete = async () => {
    try {
      await axiosinstance.delete(`/user/content?id=${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (OnDelete) OnDelete(_id);
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete. Try again.");
    }
  };

 function getYouTubeID(url: any) {
  const regExp = /^.*(?:youtu\.be\/|shorts\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length === 11 ? match[1] : null;
}



  // ✅ Derive displayType safely without mutating props
  const displayType = type === 'article' ? 'websites' : type;

  return (
    <div className="bg-white text-gray-900 rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition duration-300 w-[360px] h-[300px] overflow-y-scroll">
      <div className=" h-[250px] ">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 max-w-[260px] truncate">
            {displayType === 'twitter' && <BsTwitter size={22} className="text-[#1DA1F2]" />}
            {displayType === 'youtube' && <BsYoutube size={22} className="text-[#FF0000]" />}
            <span className="truncate">{title}</span>
          </div>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600 transition"
            aria-label="Delete card"
          >
            <MdDelete size={20} />
          </button>
        </div>

        {/* Content */}
        {content && (
          <p className="text-sm text-gray-700 mb-3 leading-snug">
            {content}
          </p>
        )}
        <div className=''>
        {/* Embeds */}
        {displayType === 'youtube' && (
          <div className="mb-2">
            <iframe
  className="w-full aspect-video rounded-md"
  src={`https://www.youtube.com/embed/${getYouTubeID(link)}`}
  referrerPolicy="no-referrer"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  title="YouTube Video"
/>
          </div>

        )}

        {displayType === 'pdf' && (
          <iframe
            src={fileUrl}
            className="h-48 w-full border rounded"
            title={title}
          ></iframe>
        )}

        {displayType === 'websites' && (
          <iframe
            src={link}
            className="w-full h-64 border rounded"
            title={title}
          ></iframe>
        )}
        
        {displayType === 'twitter' && (
          <div className="mb-2 ">
            <blockquote className="twitter-tweet">
              <a href={link.replace('x.com', 'twitter.com')} target="_blank" rel="noreferrer">
                View Tweet
              </a>
            </blockquote>
          </div>
        )}
       
        </div>
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-2 py-[2px] rounded-full text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between text-xs text-gray-500">
          <span>{formattedDate}</span>
          <span>{formattedTime}</span>
        </div>
      </div>
    </div>
  );
}
