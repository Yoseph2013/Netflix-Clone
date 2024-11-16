import { Route, Routes,Navigate } from "react-router-dom"
import HomePage from "./Pages/home/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LogInPage from "./pages/LogInPage"
import Footer from "./componentes/Footer"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authUser"
import { useEffect } from "react"
import { Loader } from "lucide-react"

function App() {
  const { user, isCheckingAuth , authCheck } = useAuthStore();
  console.log("Auth user is here",user);

  useEffect(() => {
    authCheck();
  },[authCheck])
if (isCheckingAuth) {
  return (
  <div className="h-screen">
    <div className="flex justify-center items-center bg-black h-full">
      <Loader className="animate-spin text-red-600 w-10 h-10"/>
    </div>

  </div>)
}
  return (
    <>
    <Routes>
      <Route path="/" element= {<HomePage/>}/>
      <Route path="/login" element= {!user ? <LogInPage/>: <Navigate to={'/'}/>}/>
      <Route path="/signup" element= {!user ? <SignUpPage/>: <Navigate to={"/"}/>}/>
    </Routes>
    <Footer/>
    <Toaster/>
     
  </>)
     
}

export default App
