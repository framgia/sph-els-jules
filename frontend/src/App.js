import { Route, Routes } from "react-router-dom";

import AdminLessons from "./pages/admin/Lessons/Lessons";
import Admins from "./pages/admin/Admins/Admins";
import AdminWords from "./pages/admin/Words/Words";
import Dashboard from "./pages/user/home/Dashboard/Dashboard";
import EditProfile from "./pages/user/home/Settings/EditProfile";
import LessonDetails from "./pages/admin/LessonDetails/LessonDetails";
import Lessons from "./pages/user/home/Lessons/Lessons";
import Login from "./pages/auth/Login/Login";
import Profile from "./pages/user/home/Profile/Profile";
import Signup from "./pages/auth/Signup/Signup";
import Results from "./pages/user/home/Results/Results";
import Users from "./pages/user/home/Users/Users";
import WordDetails from "./pages/admin/WordDetails/WordDetails";
import Words from "./pages/user/home/Words/Words";

import useAuth from "./shared/hooks/useAuth";

import "./App.css";

function App() {
  useAuth();

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/admins" element={<Admins />} />
        <Route path="/admin/lessons" element={<AdminLessons />} />
        <Route path="/admin/lesson" element={<LessonDetails />} />
        <Route path="/admin/lesson/word" element={<WordDetails />} />
        <Route path="/admin/lesson/words" element={<AdminWords />} />

        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/results" element={<Results />} />
        <Route path="/users" element={<Users />} />
        <Route path="/words" element={<Words />} />
      </Routes>
    </div>
  );
}

export default App;
