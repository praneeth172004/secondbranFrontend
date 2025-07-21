import { BiShare } from 'react-icons/bi';
import Button from '../Components/Button';
import PlusIcon from '../Icons/PlusIcon';
import axiosinstance from '../axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface IconsProps {
  show: boolean;
  setshow: React.Dispatch<React.SetStateAction<boolean>>;
  share: boolean;
  link: string;
  setshare: React.Dispatch<React.SetStateAction<boolean>>;
  setlink: React.Dispatch<React.SetStateAction<string>>;
}

export default function Icons({
  show,
  setshow,
  
  setshare,
  setlink,
}: IconsProps) {
  const navigate=useNavigate();
  const shareyourbrain = async () => {
    try {
      const response = await axiosinstance.post(
        "/user/share",
        { share: true },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` || '',
          },
        }
      );

      const sharedLink = response.data.hash || response.data;
      if (sharedLink) {
        setlink(sharedLink);
        localStorage.setItem("link", sharedLink);
        setshare(true);
      } else {
        console.warn("Link not found in response");
      }
    } catch (err) {
      console.error("Error generating share link:", err);
    }
  };

  return (
    <div className="flex w-full justify-end">
      <div className="p-4 flex justify-center items-center space-x-2">
        <Button
          variant="primary"
          size="medium"
          text="Share"
          startIcon={<BiShare fontSize="large" />}
          onClick={shareyourbrain}
        />
        <Button
          variant="primary"
          size="medium"
          text="Add Content"
          startIcon={<PlusIcon size="md" />}
          onClick={() => setshow(!show)}
        />
        <div className='w-[40px] h-[40px]  rounded-full flex justify-center items-center bg-blue-600'>
          <FontAwesomeIcon icon={faUser} fontSize={25} onClick={()=>navigate("/profile")} color='white' />
        </div>
        
      </div>
    </div>
  );
}