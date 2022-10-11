import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/user/home/Dashboard/Dashboard";
import EditProfile from "./pages/user/home/Settings/EditProfile";
import Lessons from "./pages/user/home/Lessons/Lessons";
import Login from "./pages/user/auth/Login/Login";
import Profile from "./pages/user/home/Profile/Profile";
import Signup from "./pages/user/auth/Signup/Signup";
import Users from "./pages/user/home/Users/Users";
import Words from "./pages/user/home/Words/Words";

import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/users" element={<Users />} />
        <Route path="/words" element={<Words />} />
      </Routes>
    </div>
  );
}

export default App;
