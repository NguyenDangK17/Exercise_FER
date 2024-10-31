// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem("loginUserId", userData.name);
    sessionStorage.setItem("roleUser", userData.role);
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("loginUserId");
    sessionStorage.removeItem("roleUser");
  };

  useEffect(() => {
    const savedUser = sessionStorage.getItem("loginUserId");
    if (savedUser) {
      setUser({ name: savedUser });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
