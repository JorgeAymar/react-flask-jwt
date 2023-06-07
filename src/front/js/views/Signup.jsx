import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/signup", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();

      if (response.status == 201) {
        console.log(data.error);
        alert(data.error);
        navigate("/");
      } else if (response.status == 409) {
        alert(data.error);
        console.log(data.error);
      } else {
        alert(data.error);
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
      alert("Ha ocurrido un error al intentar hacer signup" + error);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Signup</h1>
      <div className="row">
        <div className="col-md-6 mx-auto">
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
              <button type="submit" className="btn btn-primary m3-3">
                Signup
              </button>
              <Button
                type="button"
                className="btn btn-secondary ml-3-1"
                onClick={() => navigate("/")}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
