"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Utensils, Shield, UserCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, signup } = useAuth();

  const [isLoginTab, setIsLoginTab] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (isLoginTab) {
      if (!formData.email || !formData.password) {
        setErrorMsg("Please fill in all fields.");
        return;
      }
      const res = login(formData.email, formData.password);
      if (!res.success) {
        setErrorMsg(res.error);
        return;
      }
      if (res.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setErrorMsg("Please fill in all fields.");
        return;
      }
      const res = signup(formData.name, formData.email, formData.password);
      if (!res.success) {
        setErrorMsg(res.error);
        return;
      }
      router.push("/dashboard");
    }
  };

  const handleQuickLogin = (role) => {
    if (role === "admin") {
      login("admin@foodly.com", "admin123");
      router.push("/admin");
    } else {
      login("sulaima@email.com", "user123");
      router.push("/dashboard");
    }
  };

  return (
    <div className="container" style={{ paddingTop: "2rem" }}>
      {/* Screen 7: Login / Sign Up */}
      <div className="auth-container">
        {/* Left Visual Illustration */}
        <div className="auth-visual">
          <img
            src="/images/login.png"
            alt="Foodly Gourmet"
            className="auth-visual-image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>

        {/* Right Form Area */}
        <div className="auth-form-side">
          {/* Tab Switcher */}
          <div className="menu-nav-tabs" style={{ marginBottom: "1.8rem" }}>
            <button
              className={`tab-btn ${isLoginTab ? "active" : ""}`}
              onClick={() => setIsLoginTab(true)}
              style={{ width: "50%", textAlign: "center" }}
            >
              Login
            </button>
            <button
              className={`tab-btn ${!isLoginTab ? "active" : ""}`}
              onClick={() => setIsLoginTab(false)}
              style={{ width: "50%", textAlign: "center" }}
            >
              Sign Up
            </button>
          </div>

          {errorMsg && (
            <div style={{ background: "#fee2e2", color: "#dc2626", padding: "0.6rem 0.8rem", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "1rem" }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLoginTab && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Sulaima Khalil"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email or Phone</label>
              <input
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label className="form-label">Password</label>
                {isLoginTab && (
                  <a href="#" style={{ fontSize: "0.78rem", color: "var(--primary)" }}>
                    Forgot password?
                  </a>
                )}
              </div>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-primary btn-full" style={{ marginTop: "1.2rem" }}>
              {isLoginTab ? "Login" : "Create Account"}
            </button>
          </form>

          {isLoginTab ? (
            <>
              <div style={{ margin: "1.5rem 0", textAlign: "center", fontSize: "0.82rem", color: "var(--text-light)" }}>
                or continue with
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <button type="button" onClick={() => handleQuickLogin("user")} className="btn-secondary btn-full" style={{ fontSize: "0.85rem" }}>
                  <UserCheck size={16} color="var(--primary)" /> Demo Customer Login
                </button>
                <button type="button" onClick={() => handleQuickLogin("admin")} className="btn-secondary btn-full" style={{ fontSize: "0.85rem" }}>
                  <Shield size={16} color="var(--primary)" /> Demo Admin Login
                </button>
              </div>
            </>
          ) : (
            <p className="auth-account-switch">
              Already have an account?{" "}
              <button type="button" onClick={() => setIsLoginTab(true)}>Login</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
