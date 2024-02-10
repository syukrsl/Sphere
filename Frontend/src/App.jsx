// App.jsx
import React from "react";
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import TodoList from './components/TodoList.jsx';
import MeetingNotes from './components/MeetingNotes.jsx';
import ClassicGames from './components/ClassicGames.jsx';
import News from './pages/News.jsx';
import Dashboard from './pages/Dashboard';
import AuthenticatedWelcome from "./pages/AuthenticatedWelcome"; 
import RegistrationSuccess from "./pages/RegistrationSuccess";
import UserProfile from './pages/UserProfile.jsx';
import Leave from './pages/Leave';
import "./App.css";

function App() {

  return (
   
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/news" element={<News />} />
        <Route path="/todos" element={<TodoList />} />
        <Route path="/notes" element={<MeetingNotes />} />
        <Route path="/games" element={<ClassicGames />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/authenticated-welcome" element={<AuthenticatedWelcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/leave" element={<Leave />} />
      </Routes>

  );
}

export default App;
