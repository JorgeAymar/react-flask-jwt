// Private.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../AuthContext"; // Importa useAuth aquí

function Private() {
  const { isLoggedIn } = useAuth(); // Utiliza useAuth aquí
  const [isAuthorized, setIsAuthorized] = useState(false);

  const imageUrl =
    "https://s1.ppllstatics.com/elnortedecastilla/www/multimedia/202111/17/media/MM-fotos-animales-divertidos/Chee%20Kee%20Teo_Time%20for%20school-0.jpg";

  useEffect(() => {
    const checkAuthorization = async () => {
      if (isLoggedIn) {
        try {
          const response = await fetch("http://localhost:3001/api/check", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Asume que el token de autenticación está almacenado en localStorage
            },
          });

          if (response.status === 200) {
            setIsAuthorized(true);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    checkAuthorization();
  }, [isLoggedIn]);

  return (
    <div className="container mt-5">
      {isAuthorized ? (
        <>
          <h1 className="text-center">Página privada</h1>
          <p className="text-center">Estas en la página privada.</p>
          <div className="d-flex justify-content-center">
            <img
              src={imageUrl}
              alt="Imagen divertida"
              className="img-fluid rounded"
              style={{ width: "500px", height: "300px", objectFit: "cover" }}
            />
          </div>
          <p className="text-center mt-3">
            ¡Bienvenido a la zona Privada, Disfruta de esta divertida imagen!
          </p>
          <div className="d-flex justify-content-center mt-4">
            <Link to="/" className="btn btn-primary">
              Regresar a inicio
            </Link>
          </div>
        </>
      ) : (
        <h2 className="text-center">
          No tienes autorización para ver esta página.
        </h2>
      )}
    </div>
  );
}

export default Private;
