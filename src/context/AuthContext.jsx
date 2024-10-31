import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState("");

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
        sessionStorage.setItem("loginUserId", JSON.stringify(user));
        return { success: true };
      } else {
        setLoginError("Username or password is incorrect.");
        return { success: false };
      }
    } catch (error) {
      setLoginError("An unexpected error occurred. Please try again.");
      return { success: false };
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("loginUserId");
  };

  useEffect(() => {
    const savedUser = sessionStorage.getItem("loginUserId");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loginError, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
