import { Route, Routes } from "react-router-dom"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import { Toaster } from 'react-hot-toast'
import Home from "./pages/home/Home"
import Connections from "./pages/connections/Connections"
import Chat from "./pages/chat/Chat"
import Query from "./pages/query/Query"
import UnAuth from "./pages/unAuth/unAuth"
import Card from "./components/Card"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="login" element={<Login />} />
        <Route path="/query" element={<Query />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<UnAuth />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />


      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
        <Card
          title="A Beautiful Journey"
          content="Explore the serene landscapes and experience tranquility like never before. Join us as we travel to the most beautiful destinations."
          imageUrl="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
          author="John Doe"
          date="January 31, 2025"
        />
      </div>
    </>
  )
}

export default App
