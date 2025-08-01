import { useEffect, useState } from 'react';
import Icons from './Icons';
import AddContent from './AddContent';
import Card from '../Components/Card';
import axiosinstance from '../axios';
import ShowShareLink from './ShowShareLink';
import { BiLoaderCircle } from 'react-icons/bi';

interface ContentType {
  _id: string;
  title: string;
  link: string;
  content: string;
  type: string;
  tags: string[];
  createdAt: string;
  fileUrl: string;
}

interface MainProps {
  choice: string | undefined;
}

export default function Main({ choice }: MainProps) {
  const [showAddContent, setShowAddContent] = useState(false);
  const [cards, setCards] = useState<ContentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showshare, setshowshare] = useState(false);
  const [link, setlink] = useState('');
  const [pdfurl, setpdfurl] = useState<string>('');
  const [search, setsearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch all content
  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await axiosinstance.get('/user/content', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCards(response.data.content || []);
    } catch (err) {
      console.error('Error fetching content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [refreshTrigger]);

  // Fetch searched content
  useEffect(() => {
    if (!debouncedSearch.trim()) {
      fetchContent();
      return;
    }

    const searchFetch = async () => {
      try {
        const response = await axiosinstance.get(`/user/search?query=${debouncedSearch}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCards(response.data.content || []);
      } catch (err) {
        console.error('Error searching content:', err);
      }
    };

    searchFetch();
  }, [debouncedSearch]);

  // Called when content is added in AddContent modal
  const handleContentReload = () => {
    setRefreshTrigger(prev => !prev);
  };

  // Handle delete
  const handledelete = (id: string) => {
    setCards(prev => prev.filter((item) => item._id !== id));
  };

  const filteredCards =
    choice && choice !== 'all'
      ? cards.filter((card) => card.type === choice)
      : cards;

     
  return (
    <div className="bg-gray-50 w-full p-5">
      <Icons
        show={showAddContent}
        setshow={setShowAddContent}
        share={showshare}
        setshare={setshowshare}
        setlink={setlink}
        link={link}
      />

      {/* Search Input */}
      <div className="w-full flex justify-center">
        <input
          type="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          className="w-full max-w-md h-10 rounded-2xl border-2 border-black hover:border-gray-400 focus:bg-gray-200 text-black p-2"
        />
      </div>

      {/* Add Content Modal */}
      <AddContent
        show={showAddContent}
        setshow={setShowAddContent}
        pdf={pdfurl}
        setpdfurl={setpdfurl}
        onContentAdded={handleContentReload}
      />

      {/* Share Link Modal */}
      <ShowShareLink
        share={showshare}
        setshare={setshowshare}
        link={link}
        setlink={setlink}
      />

      {/* Content Cards */}
      <div className="flex flex-wrap gap-5 p-2 pt-5 max-h-[85vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300">
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <BiLoaderCircle size={50} className="animate-spin text-gray-500" />
          </div>
        ) : filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <Card
              key={card._id}
              _id={card._id}
              title={card.title}
              content={card.content}
              link={card.link}
              createdAt={card.createdAt}
              type={card.type}
              tags={card.tags}
              OnDelete={handledelete}
              fileUrl={card.fileUrl}
              
            />
          ))
        ) : (
          <p className="text-gray-500 text-lg font-bold flex justify-center items-center w-full mt-10">
            No content available.
          </p>
        )}
      </div>
    </div>
  );
}
