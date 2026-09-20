"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, UtensilsCrossed, ShoppingBag, Users, Settings, LogOut, DollarSign, ArrowUpRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";

export default function AdminDashboardPage() {
  const { logout } = useAuth();
  const { orders, updateOrderStatus } = useOrders();
  const [activeTab, setActiveTab] = useState("Dashboard");

  const totalOrdersCount = 128 + orders.length - 4;
  const totalRevenueVal = orders.reduce((sum, o) => sum + o.total, 2480);
  const activeUsersCount = 56;

  const getStatusClass = (status) => {
    if (status === "Delivered") return "status-delivered";
    if (status === "Preparing" || status === "Out for Delivery") return "status-preparing";
    return "status-cancelled";
  };

  return (
    <div className="container">
      {/* Screen 9: Admin Dashboard */}
      <div className="page-sidebar-layout">
        {/* Left Admin Sidebar */}
        <aside className="dashboard-sidebar-nav">
          <div className="brand-logo" style={{ marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border-color)" }}>
            <span className="brand-icon">
              <UtensilsCrossed size={18} />
            </span>
            Foodly Admin
          </div>

          <ul className="dash-nav-list">
            <li>
              <Link href="/admin" className={`dash-nav-item ${activeTab === "Dashboard" ? "active" : ""}`}>
                <LayoutDashboard size={18} /> Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/menu" className="dash-nav-item">
                <UtensilsCrossed size={18} /> Menu Items
              </Link>
            </li>
            <li>
              <button onClick={() => setActiveTab("Orders")} className={`dash-nav-item ${activeTab === "Orders" ? "active" : ""}`} style={{ width: "100%", textAlign: "left" }}>
                <ShoppingBag size={18} /> Orders
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("Users")} className={`dash-nav-item ${activeTab === "Users" ? "active" : ""}`} style={{ width: "100%", textAlign: "left" }}>
                <Users size={18} /> Users
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("Settings")} className={`dash-nav-item ${activeTab === "Settings" ? "active" : ""}`} style={{ width: "100%", textAlign: "left" }}>
                <Settings size={18} /> Settings
              </button>
            </li>
            <li className="dash-nav-item" onClick={logout} style={{ color: "#ef4444", marginTop: "1.5rem" }}>
              <LogOut size={18} /> Logout
            </li>
          </ul>
        </aside>

        {/* Main Content Area */}
        <main>
          <div className="section-header" style={{ marginBottom: "1.5rem" }}>
            <h1 className="section-title">Dashboard</h1>
          </div>

          {/* KPI Metrics Cards (Screen 9) */}
          <div className="dash-kpi-grid">
            <div className="kpi-card">
              <div>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Total Orders</span>
                <div className="kpi-val">{totalOrdersCount}</div>
              </div>
              <div className="kpi-icon-box">
                <ShoppingBag size={22} />
              </div>
            </div>

            <div className="kpi-card">
              <div>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Total Revenue</span>
                <div className="kpi-val">${totalRevenueVal.toLocaleString("en-US", { minimumFractionDigits: 0 })}</div>
              </div>
              <div className="kpi-icon-box">
                <DollarSign size={22} />
              </div>
            </div>

            <div className="kpi-card">
              <div>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Active Users</span>
                <div className="kpi-val">{activeUsersCount}</div>
              </div>
              <div className="kpi-icon-box">
                <Users size={22} />
              </div>
            </div>
          </div>

          {/* Recent Orders Table Section */}
          <div style={{ background: "white", borderRadius: "12px", border: "1px solid var(--border-color)", padding: "1.5rem" }}>
            <div className="section-header" style={{ marginBottom: "1.2rem" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>Recent Orders</h3>
              <a href="#" style={{ color: "var(--primary)", fontSize: "0.88rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.2rem" }}>
                View All <ArrowUpRight size={14} />
              </a>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong style={{ color: "var(--primary)" }}>#{order.id}</strong>
                    </td>
                    <td>{order.customer}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      <span className={`status-pill ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.date}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        style={{ padding: "0.3rem 0.6rem", borderRadius: "6px", border: "1px solid var(--border-color)", fontSize: "0.82rem", outline: "none", cursor: "pointer" }}
                      >
                        <option value="Preparing">Preparing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
