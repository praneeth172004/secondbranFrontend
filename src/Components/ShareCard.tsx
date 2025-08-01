import { useEffect, useState } from 'react';
import { BsTwitter, BsYoutube } from 'react-icons/bs';

import { useAuth } from '../AuthProvider';

interface ShareCardProps {
 
  title: string;
  link: string;
  content: string;
  type: string;
  tags: string[];
  createdAt: string;
  OnDelete?: (id: string) => void;
  fileUrl: string;
}

export default function ShareCard({

  title,
  link,
  content,
  type,
  tags,
  createdAt,
 
}: ShareCardProps) {
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();
  //@ts-ignore
  const { urlimage } = useAuth() as any;

  const [isTweetLoaded, setIsTweetLoaded] = useState(false);
  const displayType = type === 'article' ? 'websites' : type;

  

  const getYouTubeID = (url: string) => {
    const regExp = /^.*(?:youtu\.be\/|shorts\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  };

  useEffect(() => {
    if (displayType === 'twitter') {
      setIsTweetLoaded(false);
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => setIsTweetLoaded(true);
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [displayType, link]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow hover:shadow-lg transition duration-300 w-full max-w-[360px] h-auto max-h-[360px] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start px-4 pt-4">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 max-w-[240px] truncate">
          {displayType === 'twitter' && <BsTwitter size={20} className="text-[#1DA1F2]" />}
          {displayType === 'youtube' && <BsYoutube size={20} className="text-[#FF0000]" />}
          <span className="truncate">{title}</span>
        </div>
        
       
        
      </div>

      {/* Content */}
      <div className="px-4 py-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {content && <p className="text-sm text-gray-700 mb-3 leading-snug">{content}</p>}

        <div className="flex justify-center items-center mb-4">
          {/* YouTube */}
          {displayType === 'youtube' && (
            <iframe
              className="w-full aspect-video rounded-md"
              src={`https://www.youtube.com/embed/${getYouTubeID(link)}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube Video"
            />
          )}

          {/* Website */}
          {displayType === 'websites' && link && (
            <div className="text-center w-full">
              <p className="text-sm font-semibold text-gray-600 mb-1">
                {new URL(link).hostname.replace('www.', '')}
              </p>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-md hover:bg-blue-200 transition"
              >
                Visit Website
              </a>
            </div>
          )}

          {/* Twitter */}
          {displayType === 'twitter' && (
            <div className="mb-2 text-center w-full">
              {!isTweetLoaded && (
                <div className="text-sm text-gray-400 italic animate-pulse mb-2">
                  Loading tweet...
                </div>
              )}
              <blockquote className="twitter-tweet">
                <a
                  href={link.replace("x.com", "twitter.com")}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Tweet
                </a>
              </blockquote>
            </div>
          )}

          {/* Image */}
          {displayType === 'image' && link && (
            <img
              src={link}
              alt="Uploaded"
              className="w-full max-h-[200px] object-cover rounded-lg shadow-sm"
            />
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-700 px-2 py-[2px] rounded-full text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className='flex justify-between'>
      <div className="px-4 pb-2 text-xs text-gray-500 flex justify-between w-full">
        <span>{formattedDate}</span>
        <span>{formattedTime}</span>
      </div>
      </div>
    </div>
  );
}
