import { Route, Routes } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { Toaster } from 'react-hot-toast';
import Home from "./pages/home/Home";
import Connections from "./pages/connections/Connections";
import Chat from "./pages/chat/Chat";
import Query from "./pages/query/Query";
import UnAuth from "./pages/unAuth/unAuth";
import Profile from "./pages/Profile/Profile";

function App() {

  return (
    <>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <Home />
          }
        />
        <Route
          path="/connections"
          element={
            <Connections />
          }
        />
        <Route
          path="/chat"
          element={
            <Chat />
          }
        />
        <Route
          path="/query"
          element={
            <Query />
          }
        />

        {/* Public Routes */}
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<UnAuth />} />
      </Routes>

      {/* Toast Notification */}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
