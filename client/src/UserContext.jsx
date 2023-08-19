import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  
  useEffect(() => {
    if (!user) {
      axios.get("/profile")
        .then(({ data }) => {
          setUser(data);
          setReady(true);
        })
        .catch(error => {
          console.error('Axios GET error:', error);
          setReady(true); // Set ready even on error
        });
    }
  }, [user]); // Added user to dependency array to prevent repeated requests
  
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
