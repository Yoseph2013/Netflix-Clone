import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignInPage from "./Pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element= {<HomePage/>}/>
      <Route path="/signin" element= {<SignInPage/>}/>
      <Route path="/signup" element= {<SignUpPage/>}/>
    </Routes>
     
  </>)
     
}

export default App
