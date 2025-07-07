import { Route, Routes } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Connections from "./pages/connections/Connections";
import Chat from "./pages/chat/Chat";
import Query from "./pages/query/Query";
import UnAuth from "./pages/unAuth/unAuth";
import Profile from "./pages/Profile/Profile";
import Footer from "./components/HomeLayout/Footer";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/authSlice";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/query" element={<Query />} />
        <Route path="/profile" element={<Profile />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Fallback */}
        <Route path="*" element={<UnAuth />} />
      </Routes>

      {/* Toasts */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
