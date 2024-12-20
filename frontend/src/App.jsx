import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";

function App() {
 
    const {user, isCheckingAuth, authCheck} = useAuthStore();

    //only runs once on re render
    //everytime a re render occurs check for auth, once
    useEffect(() => {
      authCheck();
    },[authCheck]);

    if(isCheckingAuth){
      return (
        <div className="h-screen">
          <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10"/>
          </div>
        </div>
      )
    }

    
    console.log("auth user is here: ", user);
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={user ? <Navigate to={"/"}/> : <LoginPage/>}/>
      <Route path='/signup' element={user ? <Navigate to={"/"}/> : <SignUpPage/>}/>
    </Routes>
    <Footer/>
    <Toaster/>
    </>
  )
}

export default App
