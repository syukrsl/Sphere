import React, { useState } from "react";
import "./Dashboard.css";
import UserProfile from "./UserProfile.jsx";
import MeetingNotes from "../components/MeetingNotes.jsx";
import TodoList from "../components/TodoList.jsx";
import ClassicGames from "../components/ClassicGames.jsx";
import News from "./News.jsx";
import Leave from "./Leave.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
  const [activeTab, setActiveTab] = useState(null); // Initially set to null

  // Function to handle tab changes
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // Function to handle logout (replace with your actual logout logic)
  const handleLogout = async () => {
    try {
      // Make a request to the server's /logout endpoint to log the user out
      const response = await fetch("/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (response.status === 200) {
        // Clear the authentication token (assuming you store it in local storage)
        localStorage.removeItem("authToken");

        // Redirect the user to the login page
        history.push("/login");
      } else {
        // Handle any errors that may occur during logout
        console.error("Logout failed");
        // Optionally, you can display an error message to the user
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
      // Handle any network or other errors that may occur
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
      <div className="dashboard-header">
        SPHERE
        <FontAwesomeIcon icon={faGlobe} className="fa-globe" spin size="lg" />
        </div>

        {/* Tabbed navigation */}
        <div className={`tab-item ${activeTab === "UserProfile" ? "active" : ""}`}
        onClick={() => handleTabChange("UserProfile")}>
        <FontAwesomeIcon icon={faUser} className="fa-beat" />
        User Profile
        </div>

        <div
        className={`tab-item ${activeTab === "Leave" ? "active" : ""}`}
        onClick={() => handleTabChange("Leave")}>
        <FontAwesomeIcon icon={faCalendarAlt} className="fa-beat" />
        Leave Management
        </div>

        <div
        className={`tab-item ${activeTab === "MeetingNotes" ? "active" : ""}`}
        onClick={() => handleTabChange("MeetingNotes")}>
        <FontAwesomeIcon icon={faClipboard} className="fa-beat"  />
        Meeting Notes
        </div>

        <div
        className={`tab-item ${activeTab === "TodoList" ? "active" : ""}`}
        onClick={() => handleTabChange("TodoList")}>
        <FontAwesomeIcon icon={faList} className="fa-beat" />
        TodoList
        </div>

        <div
        className={`tab-item ${activeTab === "News" ? "active" : ""}`}
        onClick={() => handleTabChange("News")}>
        <FontAwesomeIcon icon={faNewspaper} className="fa-beat" />
        News
        </div>

        <div
        className={`tab-item ${activeTab === "ClassicGames" ? "active" : ""}`}
        onClick={() => handleTabChange("ClassicGames")}>
        <FontAwesomeIcon icon={faGamepad} className="fa-beat" />
        Classic Games
        </div>
        {/* Add more tabs as needed */}
        
        {/* Spacer */}
        <div className="spacer"></div>

        {/* Settings Tab */}
        <div
          className={`tab-item ${activeTab === "Settings" ? "active" : ""}`}
          onClick={() => handleTabChange("Settings")}
        >
          Settings
        </div>
        
        {/* Logout Button */}
        <div
          className={`tab-item ${activeTab === "Logout" ? "active" : ""}`}
          onClick={() => handleLogout()} // Add your logout function here
        >
          Logout
        </div>
      </div>
      {/* Content area */}
      <div className="content">
        {/* Render content based on the activeTab */}
        {activeTab === "UserProfile" && <UserProfile />}
        {activeTab === "MeetingNotes" && (
          <div className="user-profile-content">
            <MeetingNotes />
          </div>
        )}
        {activeTab === "TodoList" && <TodoList />}
        {activeTab === "ClassicGames" && <ClassicGames />}
        {activeTab === "News" && <News />}
        {activeTab === "Leave" && <Leave />}
        {activeTab === "Settings" && (
          <div className="settings-content">
            {/* Add content for Settings tab here */}
          </div>
        )}
        {/* Add content for other tabs here */}
      </div>
    </div>
  );
}

export default Dashboard;