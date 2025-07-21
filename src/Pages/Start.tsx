import { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Main from './Main';



function Start() {
  const [choice, setchoice] = useState<string | undefined>();
  
   // Default to true
 
  
   

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
