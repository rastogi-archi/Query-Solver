import { Route, Routes } from "react-router-dom"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
