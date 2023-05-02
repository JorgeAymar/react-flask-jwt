// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); // Asegúrate de que estás definiendo 'setUsername' aquí

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    username,
    setUsername, // Proporciona 'setUsername' aquí
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
