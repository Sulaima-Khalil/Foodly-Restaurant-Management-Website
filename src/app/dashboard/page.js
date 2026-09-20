"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, MapPin, CreditCard, Settings, LogOut, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";

export default function UserDashboardPage() {
  const { user, logout } = useAuth();
  const { orders } = useOrders();
  const [activeNav, setActiveNav] = useState("My Orders");
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const getStatusClass = (status) => {
    if (status === "Delivered") return "status-delivered";
    if (status === "Preparing" || status === "Out for Delivery") return "status-preparing";
    return "status-cancelled";
  };

  const userOrders = orders.filter((o) => o.customerEmail === user?.email || true);

  return (
    <div className="container">
      {/* Screen 8: User Dashboard Layout */}
      <div className="page-sidebar-layout">
        {/* Left Dashboard Sidebar */}
        <aside className="dashboard-sidebar-nav">
          <div className="dash-user-profile">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
              alt={user?.name || "User"}
              className="dash-avatar"
            />
            <div>
              <h4 style={{ fontWeight: 700, fontSize: "0.95rem" }}>{user?.name || "Sulaima Khalil"}</h4>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{user?.email || "sulaima@email.com"}</span>
            </div>
          </div>

          <ul className="dash-nav-list">
            <li
              className={`dash-nav-item ${activeNav === "Dashboard" ? "active" : ""}`}
              onClick={() => setActiveNav("Dashboard")}
            >
              <LayoutDashboard size={18} /> Dashboard
            </li>
            <li
              className={`dash-nav-item ${activeNav === "My Orders" ? "active" : ""}`}
              onClick={() => setActiveNav("My Orders")}
            >
              <ShoppingBag size={18} /> My Orders
            </li>
            <li
              className={`dash-nav-item ${activeNav === "Addresses" ? "active" : ""}`}
              onClick={() => setActiveNav("Addresses")}
            >
              <MapPin size={18} /> Addresses
            </li>
            <li
              className={`dash-nav-item ${activeNav === "Payment Methods" ? "active" : ""}`}
              onClick={() => setActiveNav("Payment Methods")}
            >
              <CreditCard size={18} /> Payment Methods
            </li>
            <li
              className={`dash-nav-item ${activeNav === "Settings" ? "active" : ""}`}
              onClick={() => setActiveNav("Settings")}
            >
              <Settings size={18} /> Settings
            </li>
            <li
              className="dash-nav-item"
              onClick={logout}
              style={{ color: "#ef4444", marginTop: "1rem" }}
            >
              <LogOut size={18} /> Logout
            </li>
          </ul>
        </aside>

        {/* Main Content Area */}
        <main>
          <div style={{ marginBottom: "1.5rem" }}>
            <h1 className="section-title">My Orders</h1>
          </div>

          {activeNav === "My Orders" || activeNav === "Dashboard" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {userOrders.map((order) => (
                <div key={order.id} style={{ background: "white", borderRadius: "12px", border: "1px solid var(--border-color)", padding: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <div>
                      <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--primary)" }}>#{order.id}</h4>
                      <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{order.restaurantName || "Pizza Paradise"}</span>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <span className={`status-pill ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                      <span style={{ display: "block", fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                        {order.date}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.8rem", borderTop: "1px solid var(--border-light)" }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: 800 }}>${order.total.toFixed(2)}</span>

                    <button
                      onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                      style={{ color: "var(--primary)", fontSize: "0.88rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                    >
                      {expandedOrderId === order.id ? "Hide Details" : "View Details"} <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Expanded Item Details */}
                  {expandedOrderId === order.id && (
                    <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px dashed var(--border-color)", background: "var(--bg-main)", padding: "1rem", borderRadius: "8px" }}>
                      <h5 style={{ fontSize: "0.88rem", fontWeight: 700, marginBottom: "0.6rem" }}>Ordered Items:</h5>
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.85rem" }}>
                        {order.items?.map((item, idx) => (
                          <li key={idx} style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>{item.name} x {item.quantity}</span>
                            <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                          </li>
                        ))}
                      </ul>
                      <div style={{ marginTop: "0.8rem", paddingTop: "0.6rem", borderTop: "1px solid var(--border-color)", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                        <strong>Delivery Address:</strong> {order.address || "House 12, Qasim Pur Colony, Multan"}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ background: "white", padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
              <h3>{activeNav}</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>Manage your profile {activeNav.toLowerCase()} settings here.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
