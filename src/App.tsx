// App.tsx
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Start from './Pages/Start';
import SharePage from './Pages/SharePage';
import { useAuth } from './AuthProvider';
import LandingPage from './Components/LandingPage';







function App() {
  const auth=useAuth();
  console.log(auth?.isloggedin);
  
  
  
  
  return (

    <div>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login  />} />
        <Route path='/profile' element={ auth?.isloggedin ? <Profile/>:
          <Login/>
       } />
       <Route path='/Dashboard' element={auth?.isloggedin ? <Start  /> :
          <Login/> 
       }/>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/share/:id' element={<SharePage />} />
      </Routes>
    </div>
  );
}

export default App;


