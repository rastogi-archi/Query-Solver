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
import CheckAuth from "./components/common/CheckAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {

  const { user, isAuthenticated, isLoading } = useSelector(state => state.auth);

  // const dispatch = useDispatch();

  return (
    <>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Home />
            </CheckAuth>
          }
        />
        <Route
          path="/connections"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Connections />
            </CheckAuth>
          }
        />
        <Route
          path="/chat"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Chat />
            </CheckAuth>
          }
        />
        <Route
          path="/query"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Query />
            </CheckAuth>
          }
        />

        {/* Public Routes */}
        <Route path="/profile" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Profile />
          </CheckAuth>
        } />
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
