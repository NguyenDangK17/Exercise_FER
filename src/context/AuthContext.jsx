import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(""); // Track login errors

  const login = async (values) => {
    try {
      const response = await fetch(
        "https://6693578bc6be000fa07af327.mockapi.io/account"
      );
      const users = await response.json();
      const user = users.find(
        (u) => u.email === values.email && u.password === values.password
      );

      if (user) {
        setUser(user);
        sessionStorage.setItem("loginUserId", user.name);
        sessionStorage.setItem("roleUser", user.role);
        return { success: true };
      } else {
        setLoginError("Username or password is incorrect.");
        return { success: false };
      }
    } catch (error) {
      console.log("Login error: ", error);
      setLoginError("An unexpected error occurred. Please try again.");
      return { success: false };
    }
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
    <AuthContext.Provider value={{ user, login, logout, loginError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
