import React, { createContext, useState, useContext, useEffect,  } from 'react'


interface AuthContextType {
  authuser: string;
  setauthuser: React.Dispatch<React.SetStateAction<string>>;
  isloggedin: boolean;
  setisloggedin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authuser, setauthuser] = useState<string>('');
  const [isloggedin, setisloggedin] = useState<boolean>(false);
  const [urlimage,seturlimage]=useState<string>('');
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setauthuser(token ?? '');
    if (token) {
      setisloggedin(true);
      
    } else {
      
      setisloggedin(false);
      
    }
  }, []);
  
  const value = {
    authuser,
    setauthuser,
    isloggedin,
    setisloggedin,
    seturlimage,
    urlimage
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
