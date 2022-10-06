import { Routes, Route } from "react-router-dom";

import "./App.css";
import Dashboard from "./pages/user/home/Dashboard/Dashboard";
import Login from "./pages/user/auth/Login/Login";
import Signup from "./pages/user/auth/Signup/Signup";
import Profile from "./pages/user/home/Profile/Profile";
import EditProfile from "./pages/user/home/Settings/EditProfile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </div>
  );
}

export default App;
