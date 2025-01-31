import { Route, Routes } from "react-router-dom"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default App
