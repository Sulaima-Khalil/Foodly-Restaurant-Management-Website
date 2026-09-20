"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MOCK_USER } from "@/data/mockData";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("foodly_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        setUser(MOCK_USER);
      }
    } else {
      setUser(MOCK_USER);
      localStorage.setItem("foodly_user", JSON.stringify(MOCK_USER));
    }
  }, []);

  const login = (email, password) => {
    // If admin email or requested admin
    const isAdmin = email.toLowerCase().includes("admin");
    const newUser = {
      ...MOCK_USER,
      email,
      name: isAdmin ? "Admin User" : "Sulaima Khalil",
      role: isAdmin ? "admin" : "user"
    };
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem("foodly_user", JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const signup = (name, email, password) => {
    const newUser = {
      ...MOCK_USER,
      name,
      email,
      role: "user"
    };
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem("foodly_user", JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("foodly_user");
  };

  const toggleRole = () => {
    if (!user) return;
    const newRole = user.role === "admin" ? "user" : "admin";
    const updatedUser = { ...user, role: newRole };
    setUser(updatedUser);
    localStorage.setItem("foodly_user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        signup,
        logout,
        toggleRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
