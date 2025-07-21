import { useEffect, useState } from 'react';
import Icons from './Icons';
import AddContent from './AddContent';
import Card from '../Components/Card';
import axiosinstance from '../axios';
import ShowShareLink from './ShowShareLink';
import {  BiLoaderCircle } from 'react-icons/bi';


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

  const fetchContent = async () => {
    console.log(localStorage.getItem("token"));
    
    try {
      const response = await axiosinstance.get('/user/content', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response);
      
      setCards(response.data.content || []);
    } catch (err) {
      console.error('Error fetching content:', err);
    } finally {
      setLoading(false);
    }
    console.log(cards);
    
  };
  console.log(cards);
  

  const handledelete = async (id: string) => {
    try {
      setCards((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Error deleting content:', err);
    }
  };

  useEffect(() => {
    fetchContent();
   
  }, []);


  const filteredCards = choice && choice !== 'all'
    ? cards.filter((card) => card.type === choice)
    : cards;
    console.log(filteredCards);
    

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
      {/* <div className="w-full flex justify-center">
        <input
          type="search"
          name="searchQuery"
          placeholder="Search..."
          aria-label="Search"
          autoComplete="off"
          value={search}
          className="w-full max-w-md h-10 rounded-2xl border-2 border-black hover:border-gray-400 focus:bg-gray-200 text-black p-2"
          onChange={(e)=>setsearch(e.target.value)}
        />
      </div> */}
      <AddContent
        show={showAddContent}
        setshow={setShowAddContent}
        pdf={pdfurl}
        setpdfurl={setpdfurl}
      />

      <ShowShareLink
        share={showshare}
        setshare={setshowshare}
        link={link}
        setlink={setlink}
      />

      {/* ✅ Show Filter if a certain type is selected (adjust condition as needed) */}

      <div className="flex flex-wrap gap-5 p-2 h-[85%] overflow-y-scroll pt-5 ">
        {loading ? (
          <div className='flex justify-center items-center w-full h-full'>
            <BiLoaderCircle size={50}></BiLoaderCircle>
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
          <p className="text-gray-500 text-lg font-bold flex justify-center items-center h-screen w-full">
            No content available.
          </p>
        )}
      </div>

    </div>
  );
}
