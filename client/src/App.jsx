import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Connections from "./pages/connections/Connections";
import Chat from "./pages/chat/Chat";
import Query from "./pages/query/Query";
import UnAuth from "./pages/unAuth/unAuth";
import Profile from "./pages/Profile/Profile";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/Protected";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  
  const { isAuthenticated, isLoading} = useSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Default Route */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/register" />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/connections"
          element={
            <ProtectedRoute>
              <Connections />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/query"
          element={
            <ProtectedRoute>
              <Query />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Public Auth Routes */}
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
