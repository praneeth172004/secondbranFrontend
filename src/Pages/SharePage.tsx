// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axiosinstance from '../axios';
// import Card from '../Components/Card';

// interface ContentType {
//   _id: string;
//   title: string;
//   link: string;
//   content: string;
//   type: string;
//   tags: string[];
//   createdAt: string;
// }

// export default function SharePage() {
//   const { id } = useParams(); // ✅ Get the hash from URL like /share/:id
//   const [data, setData] = useState<ContentType[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchSharedContent = async () => {
//     try {
//       const response = await axiosinstance.get(`/user/share/${id}`); // ✅ no token
//       setData(response.data.content || []);
//     } catch (err) {
//       console.error("Error fetching shared content:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id) fetchSharedContent();
//   }, [id]);

//   return (
//     <div className="p-5 min-h-screen bg-gray-100">
//       <h1 className="text-3xl font-semibold font-serif mb-2">Shared Brain</h1>
//       <p className="text-gray-500 mb-6">Shared by someone</p>

//       {loading ? (
//         <p className="text-gray-500">Loading...</p>
//       ) : data.length > 0 ? (
//         <div className="flex flex-wrap gap-4">
//           {data.map((card) => (
//             <Card
//               key={card._id}
//               _id={card._id}
//               title={card.title}
//               content={card.content}
//               link={card.link}
//               createdAt={card.createdAt}
//               type={card.type}
//               tags={card.tags}
//             />
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500">No shared content available.</p>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../Components/Card';
import axiosinstance from '../axios';

interface ContentType {
  _id: string;
  title: string;
  link: string;
  content: string;
  type: string;
  tags: string[];
  createdAt: string;
  fileUrl:string;
}

function SharePage() {
  const { id } = useParams(); // 👈 get the link from URL param
  const [data, setData] = useState<ContentType[]>([]);

  const fetchData = async () => {
    try {
      const response = await axiosinstance.get(`/user/share/${id}`, {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('token')}`,
        // },
      });

      console.log("Fetched Shared Content:", response.data.content);
      setData(response.data.content || []);
    } catch (err) {
      console.error("Error fetching shared data:", err);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen w-full overflow-y-scroll bg-gray-50 p-5">
      <div className="w-full text-3xl font-serif font-semibold mb-2">Ravi</div>
      <div className="text-lg text-gray-500 mb-6">shared brain</div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 w-full space-y-[5px]">
        {data.length > 0 ? (
          data.map((card) => (
            <Card
                          key={card._id}
                          _id={card._id}
                          title={card.title}
                          content={card.content}
                          link={card.link}
                          createdAt={card.createdAt}
                          type={card.type}
                          tags={card.tags}
                          
                          fileUrl={card.fileUrl}
                        />
          ))
        ) : (
          <p className="text-gray-600 text-lg">No shared content available.</p>
        )}
      </div>
    </div>
  );
}

export default SharePage;

