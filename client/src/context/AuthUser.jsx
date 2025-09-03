import React, { createContext, useEffect, useState } from 'react'
export const AuthContext=createContext();
const AuthUser = ({children}) => {
    const [authUser,setAuthUser]=useState(() => {
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
    const [users,setUsers]=useState([]);
    const [selectedUserId,setSelectedUserId]=useState([])
    const [userGroups,setUserGroups]=useState(null)

    useEffect(() => {
    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("authUser");
    }
  }, [authUser]);
  return (
    <AuthContext.Provider 
      value={{authUser,setAuthUser,users,setUsers,selectedUserId,setSelectedUserId,userGroups,setUserGroups}}>
        {children}
      </AuthContext.Provider>
  )
}

export default AuthUser
