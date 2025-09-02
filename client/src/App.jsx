import { Routes,Route, Navigate } from "react-router-dom"
import SignUp from "./pages/Authentication/SignUp"
import Login from "./pages/Authentication/Login"
import Home from "./pages/Main/Home"
import NavBar from "./components/NavBar"
import toast,{Toaster} from 'react-hot-toast'
import { useContext, useEffect } from "react"
import { AuthContext } from "./context/AuthUser"
import Dash from "./pages/Main/Dash"
import { useAuth } from "./hooks/useAuth"
import ShoppingList from "./pages/Main/ShoppingList"

function App() {
 
  const {authUser}=useContext(AuthContext);
  const {getUser}=useAuth();

  useEffect(()=>{

    const fetchActiveUser=async()=>{
      await getUser();

    }

    fetchActiveUser();
  },[])


  return (
    <>
    <Toaster/>
    
      
      <Routes>
        <Route path="/signup" element={!authUser?<SignUp/>:<Navigate to="/dash"/>}/>
        <Route path="/login" element={!authUser?<Login/>:<Navigate to="/dash"/>}/>
        <Route path="/" element={!authUser?<><NavBar/> <Home/></>:<Navigate to="/dash"/>}/>
        <Route path="/dash" element={authUser?<><NavBar/> <Dash/></>:<Navigate to={"/"}/>}/>
        <Route path="/dash/:listid" element={authUser?<ShoppingList/>:<Navigate to="/"/>}/>
      </Routes>
     
    </>
  )
}

export default App
