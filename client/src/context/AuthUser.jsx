import React, { createContext, useState } from 'react'
export const AuthContext=createContext();
const AuthUser = ({children}) => {
    const [authUser,setAuthUser]=useState(null);
  return (
    <AuthContext.Provider value={{authUser,setAuthUser}}>{children}</AuthContext.Provider>
  )
}

export default AuthUser
