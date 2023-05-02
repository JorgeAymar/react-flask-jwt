// Login.jsx
import React from "react";
import LoginForm from "./LoginForm.jsx";
import { useAuth } from "../AuthContext"; // Importa useAuth aquí

function Login() {
  const { isLoggedIn, setIsLoggedIn } = useAuth(); // Utiliza useAuth aquí

  const handleLoginSubmit = (credentials) => {
    // Aquí puedes manejar la lógica de inicio de sesión
    console.log(credentials);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center my-4">Iniciar sesión</h2>
          <LoginForm onSubmit={handleLoginSubmit} />
        </div>
      </div>
    </div>
  );
}

export default Login;
