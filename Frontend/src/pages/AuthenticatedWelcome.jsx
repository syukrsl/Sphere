import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthenticatedWelcome.css";

function AuthenticatedWelcome() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Automatically redirect to the dashboard page after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide loading animation after 5 seconds
      navigate("/dashboard");
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="welcome-container">
      {isLoading && (
        <div className="loading-animation">
          {/* You can replace this with your preferred loading animation */}
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
}

export default AuthenticatedWelcome;
