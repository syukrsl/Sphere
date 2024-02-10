import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Check if either the email or password field is empty
    if (!email || !password) {
      console.error("Please fill in both email and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // Save the token in localStorage or a secure storage method
        localStorage.setItem("token", token);

        // Redirect to AuthenticatedWelcome.jsx
        navigate("/authenticated-welcome");
      } else {
        console.log("Sign-in failed.");
      }
    } catch (error) {
      console.error("An error occurred during sign-in:", error);
    }
  };

  return (
    <div className="sign-in-page">
      <div className="login-card">
        <h2>Sign In to SPHERE
        <FontAwesomeIcon icon={faGlobe} spin size="xl"/></h2>

        <form>
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
          <button onClick={handleSignIn}>Sign In</button>
        </form>

        <p>
          Dont have an account? <Link to="/sign-up">Sign Up</Link>
        </p>

        <p>
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
