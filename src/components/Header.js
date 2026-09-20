"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Shield, Utensils } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const pathname = usePathname();
  const { user, isLoggedIn, toggleRole } = useAuth();
  const { itemCount } = useCart();

  const isActive = (path) => pathname === path;

  return (
    <header className="header-nav">
      <div className="container header-container">
        {/* Brand Logo */}
        <Link href="/" className="brand-logo">
          <span className="brand-icon">
            <Utensils size={18} />
          </span>
          Foodly
        </Link>

        {/* Dynamic Navigation Links based on Auth State */}
        <nav>
          <ul className="nav-links">
            <li>
              <Link href="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/restaurants" className={`nav-link ${isActive("/restaurants") ? "active" : ""}`}>
                Restaurants
              </Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li>
                  <Link href="/about" className={`nav-link ${isActive("/about") ? "active" : ""}`}>
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`}>
                    Contact
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/dashboard" className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}>
                    User Profile
                  </Link>
                </li>
                {user?.role === "admin" && (
                  <li>
                    <Link href="/admin" className={`nav-link ${isActive("/admin") || isActive("/admin/menu") ? "active" : ""}`}>
                      Admin Panel
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </nav>

        {/* Right Header Actions */}
        <div className="header-actions">
          {/* Quick Role Switcher Button for Evaluation */}
          {isLoggedIn && (
            <button
              onClick={toggleRole}
              className="btn-secondary"
              style={{ fontSize: "0.78rem", padding: "0.4rem 0.8rem", borderRadius: "99px" }}
              title="Click to switch role between User and Admin"
            >
              <Shield size={14} color="var(--primary)" />
              Role: <strong style={{ color: "var(--primary)" }}>{user?.role === "admin" ? "Admin" : "Customer"}</strong>
            </button>
          )}

          {/* Cart Icon Link */}
          <Link href="/cart" className="action-icon-btn" aria-label="Shopping Cart">
            <ShoppingBag size={20} />
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>

          {/* User Account / Login Button */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            {isLoggedIn ? (
              <Link href={user?.role === "admin" ? "/admin" : "/dashboard"} className="action-icon-btn" aria-label="User Account">
                <User size={20} />
              </Link>
            ) : (
              <Link href="/login" className="btn-primary" style={{ padding: "0.5rem 1.2rem", fontSize: "0.88rem" }}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
