import { createContext, useContext, useEffect, useState } from "react";

// pertenece a config de firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

export const UserContext = createContext();

// export default function UserContextProvider({children}){
//   const[user, setUser] = useState(false);
//   return (
//     <UserContext.Provider value={{user}}>{children}</UserContext.Provider>
//   )
// }

export default function UserProvider ({children}) {

  const [user, setUser] = useState(false);
  //false null objeto puede ser user 
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsuscribe;
  }, [user]);

  if(user === false) return <p>Loading app...</p>;
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUserContext = () => useContext(UserContext);
