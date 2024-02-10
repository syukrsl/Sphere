import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RegistrationSuccess.css';

function RegistrationSuccess() {
  const handleLogout = async () => {
    try {
      // Send a POST request to the server's logout endpoint
      const response = await fetch('/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // You can include any necessary data in the request body if needed
      });

      if (response.ok) {
        // Clear any client-side authentication state (e.g., remove token from local storage)
        // Redirect the user to the login page or another appropriate page
        // For simplicity, let's assume you're redirecting to the home page ("/" route)
        window.location.href = '/';
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    const preventBackNavigation = () => {
      window.history.pushState(null, null, window.location.href);
      alert("Please use the provided buttons to navigate.");
    };

    window.addEventListener('popstate', preventBackNavigation);

    return () => {
      window.removeEventListener('popstate', preventBackNavigation);
    };
  }, []);

  return (
    <div className="registration-success-page">
      <div className="success-card">
        <h1>Registration Successful</h1>
        <p>Congratulations, your registration was successful!</p>
        <Link to="/dashboard">
          <button className="dashboard-button">Go to Dashboard</button>
        </Link>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}

export default RegistrationSuccess;
