import React, { createContext, useState } from 'react'
export const ListContext=createContext();
const ListManager = ({children}) => {
    const [userLists,setUserLists]=useState([]);
    const [currentList,setCurrentList]=useState([]);
    const [inventory,setInventory]=useState([]);
  return (
    <ListContext.Provider value={{userLists,setUserLists,currentList,setCurrentList,inventory,setInventory}}>
      {children}
    </ListContext.Provider>
  )
}

export default ListManager
