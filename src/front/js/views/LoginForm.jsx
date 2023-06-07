// LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../AuthContext"; // Import useAuth instead of AuthContext

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn, setUsername } = useAuth(); // Add setUsername here

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the login endpoint with the form data
      const response = await fetch("http://localhost:3001/api/login", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();
      console.log(response.status);

      if (response.status == 200) {
        // If the response is successful, navigate to the /private route
        localStorage.setItem("token", data.token); // Store the token in localStorage
        setIsLoggedIn(true); // Use setIsLoggedIn instead of assigning directly
        setUsername(email); // Set the username value here
        navigate("/");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while trying to log in" + error);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="p-3">
          <Button type="submit" className="btn btn-primary mr-3">
            Login
          </Button>
          <Button
            type="button"
            className="btn btn-secondary ml-5"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
