import { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Main from './Main';
import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';


function Start() {
  const [choice, setchoice] = useState<string | undefined>();
  
   // Default to true
   const auth=useAuth();
   const navigate=useNavigate();
  
   

  // // Conditional rendering based on loading state
 

  return (
    <div className="h-screen w-full flex bg-black">
     
        <Sidebar
          choice={choice}
          setchoice={setchoice}
          
        />
   
      <Main
        choice={choice}
        
      />
    </div>
  );
}

export default Start;
