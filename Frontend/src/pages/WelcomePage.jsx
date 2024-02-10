import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./WelcomePage.css"; // Import your CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignUp = async (event) => {
  event.preventDefault();

  // Check if any of the fields (name, email, password) are empty
  if (!name || !email || !password) {
    console.error("Please fill in all the required fields.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      // Registration was successful
      // Redirect the user to a page that shows "Registration Successful"
      navigate("/registration-success");
    } else {
      // Handle registration error (e.g., display error message)
      console.error("Registration failed.");
    }
  } catch (error) {
    console.error("An error occurred during registration:", error);
  }
};


  return (
    <div className="welcome-page">
      <div className="login-card">
      <h1>
        Welcome to Sphere
        <FontAwesomeIcon icon={faGlobe} spin size="xl"/></h1>

        {/* Sign-up form */}
        <form>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignUp}>Sign Up</button>
        </form>

        {/* Sign-in link */}
        <p>
          Already have an account? <Link to="/sign-in">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
