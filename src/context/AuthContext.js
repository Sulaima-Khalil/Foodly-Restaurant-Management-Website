"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MOCK_USER } from "@/data/mockData";

const AuthContext = createContext();

const INITIAL_ADDRESSES = [
  {
    id: "addr-1",
    title: "Home",
    recipient: "Sulaima Khalil",
    phone: "+92 300 1234567",
    address: "House 12, Qasim Pur Colony, Multan",
    isDefault: true
  },
  {
    id: "addr-2",
    title: "Office / Work",
    recipient: "Sulaima Khalil",
    phone: "+92 300 9876543",
    address: "Suite 402, Business Tower, Gulberg, Lahore",
    isDefault: false
  }
];

const INITIAL_PAYMENT_METHODS = [
  {
    id: "pm-1",
    type: "Cash on Delivery",
    cardHolder: "Sulaima Khalil",
    cardNumber: "Cash on Delivery",
    expiry: "N/A",
    isDefault: true
  },
  {
    id: "pm-2",
    type: "Visa Card",
    cardHolder: "Sulaima Khalil",
    cardNumber: "•••• •••• •••• 4242",
    expiry: "12/28",
    isDefault: false
  }
];

const DEFAULT_USERS = [
  {
    id: "u_demo_customer",
    name: "Sulaima Khalil",
    email: "sulaima@email.com",
    password: "user123",
    phone: "+92 300 1234567",
    role: "user",
    addresses: INITIAL_ADDRESSES,
    paymentMethods: INITIAL_PAYMENT_METHODS
  },
  {
    id: "u_demo_admin",
    name: "Admin User",
    email: "admin@foodly.com",
    password: "admin123",
    phone: "+92 300 0000000",
    role: "admin",
    addresses: INITIAL_ADDRESSES,
    paymentMethods: INITIAL_PAYMENT_METHODS
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    // Initialize LocalStorage Registered Users Database
    const savedRegisteredUsers = localStorage.getItem("foodly_registered_users");
    if (!savedRegisteredUsers) {
      localStorage.setItem("foodly_registered_users", JSON.stringify(DEFAULT_USERS));
    }

    // Initialize Active Session User
    const savedUser = localStorage.getItem("foodly_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (!parsed.addresses) parsed.addresses = INITIAL_ADDRESSES;
        if (!parsed.paymentMethods) parsed.paymentMethods = INITIAL_PAYMENT_METHODS;
        setUser(parsed);
        setIsLoggedIn(true);
      } catch (e) {
        setUser(DEFAULT_USERS[0]);
        setIsLoggedIn(true);
      }
    } else {
      setUser(DEFAULT_USERS[0]);
      setIsLoggedIn(true);
      localStorage.setItem("foodly_user", JSON.stringify(DEFAULT_USERS[0]));
    }
  }, []);

  const getRegisteredUsers = () => {
    try {
      const saved = localStorage.getItem("foodly_registered_users");
      return saved ? JSON.parse(saved) : DEFAULT_USERS;
    } catch (e) {
      return DEFAULT_USERS;
    }
  };

  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const registeredUsers = getRegisteredUsers();

    // Check matching user credentials
    const foundUser = registeredUsers.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    // Fallback for quick admin keyword or demo user
    if (!foundUser) {
      if (cleanEmail.includes("admin")) {
        const adminUser = DEFAULT_USERS[1];
        setUser(adminUser);
        setIsLoggedIn(true);
        localStorage.setItem("foodly_user", JSON.stringify(adminUser));
        return { success: true, user: adminUser };
      }
      return {
        success: false,
        error: "Invalid email or password. Please sign up if you don't have an account."
      };
    }

    setUser(foundUser);
    setIsLoggedIn(true);
    localStorage.setItem("foodly_user", JSON.stringify(foundUser));
    return { success: true, user: foundUser };
  };

  const signup = (name, email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const registeredUsers = getRegisteredUsers();

    // Check if user already exists
    const existing = registeredUsers.find(
      (u) => u.email.toLowerCase() === cleanEmail
    );

    if (existing) {
      return {
        success: false,
        error: "An account with this email already exists. Please log in instead."
      };
    }

    const newUser = {
      id: `u_${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      password: password,
      phone: "+92 300 1234567",
      role: "user",
      addresses: INITIAL_ADDRESSES,
      paymentMethods: INITIAL_PAYMENT_METHODS
    };

    const updatedUsers = [...registeredUsers, newUser];
    localStorage.setItem("foodly_registered_users", JSON.stringify(updatedUsers));

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

  const updateUser = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem("foodly_user", JSON.stringify(updated));

      // Also update in registered users database
      const registeredUsers = getRegisteredUsers();
      const updatedRegistered = registeredUsers.map((u) =>
        u.email.toLowerCase() === updated.email.toLowerCase() ? updated : u
      );
      localStorage.setItem("foodly_registered_users", JSON.stringify(updatedRegistered));

      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        signup,
        logout,
        toggleRole,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
