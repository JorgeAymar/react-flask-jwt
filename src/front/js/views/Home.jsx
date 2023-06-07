// Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginStatus from "../component/LoginStatus.jsx";
import { useAuth } from "../AuthContext"; // Importa useAuth aquí

function Home() {
  const { isLoggedIn, setIsLoggedIn, username } = useAuth(); // Utiliza useAuth aquí

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end">
        <LoginStatus isLoggedIn={isLoggedIn} username={username} />
      </div>
      <h1 className="text-center">Bienvenido a mi sitio web</h1>
      <p className="text-center">Por favor, inicie sesión para continuar:</p>
      <div className="d-flex justify-content-center">
        <Link to="/login" className="btn btn-primary ml-3">
          Login
        </Link>
        <Link to="/signup" className="btn btn-primary ml-3">
          Signup
        </Link>
        {isLoggedIn && (
          <Link to="/private" className="btn btn-primary ml-3">
            Private
          </Link>
        )}
      </div>
      <p className="text-center mt-5">¡Gracias por visitarnos!</p>
    </div>
  );
}

export default Home;
