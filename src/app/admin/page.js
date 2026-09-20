"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  DollarSign,
  ArrowUpRight,
  Store,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle,
  X,
  Shield,
  ShieldAlert,
  Save,
  Filter,
  Eye
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import LogoutModal from "@/components/LogoutModal";
import AddEditItemModal from "@/components/AddEditItemModal";
import AddEditRestaurantModal from "@/components/AddEditRestaurantModal";
import AddEditUserModal from "@/components/AddEditUserModal";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { logout, registeredUsers, addUser, deleteUser, toggleUserRole } = useAuth();
  const {
    orders,
    updateOrderStatus,
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    restaurants,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant
  } = useOrders();

  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Restaurant Modal State
  const [isRestModalOpen, setIsRestModalOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [restSearch, setRestSearch] = useState("");

  // Menu Items Modal State
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [menuSearch, setMenuSearch] = useState("");

  // Users Modal State
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userSearch, setUserSearch] = useState("");

  // Orders Filter State
  const [orderStatusFilter, setOrderStatusFilter] = useState("All");
  const [orderSearch, setOrderSearch] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Settings State
  const [settingsForm, setSettingsForm] = useState(() => {
    const fallback = {
      siteName: "Foodly",
      supportEmail: "support@foodly.com",
      deliveryFee: "2.00",
      freeDeliveryOver: "30.00",
      currency: "$",
      maintenanceMode: false
    };

    if (typeof window === "undefined") return fallback;

    try {
      const saved = localStorage.getItem("foodly_admin_settings");
      return saved ? { ...fallback, ...JSON.parse(saved) } : fallback;
    } catch (e) {
      return fallback;
    }
  });
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem("foodly_admin_settings", JSON.stringify(settingsForm));
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 3000);
  };

  const handleConfirmLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    router.push("/login");
  };

  // KPI Calculations
  const totalOrdersCount = 128 + orders.length - 4;
  const totalRevenueVal = orders.reduce((sum, o) => sum + (o.total || 0), 2480);
  const activeUsersCount = registeredUsers.length > 0 ? registeredUsers.length : 56;
  const totalRestaurantsCount = restaurants.length;

  const getStatusClass = (status) => {
    if (status === "Delivered") return "status-delivered";
    if (status === "Preparing" || status === "Out for Delivery") return "status-preparing";
    return "status-cancelled";
  };

  // Filtered Lists
  const filteredRestaurants = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(restSearch.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(restSearch.toLowerCase())
  );

  const filteredMenuItems = menuItems.filter(
    (m) =>
      m.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
      m.category.toLowerCase().includes(menuSearch.toLowerCase())
  );

  const filteredUsers = registeredUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = orderStatusFilter === "All" || o.status === orderStatusFilter;
    const matchesSearch =
      !orderSearch ||
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.toLowerCase().includes(orderSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="container" style={{ paddingTop: "1.5rem", paddingBottom: "3rem" }}>
      <div className="page-sidebar-layout">
        {/* Left Admin Sidebar Navigation */}
        <aside className="dashboard-sidebar-nav">
          <div
            className="brand-logo"
            style={{
              marginBottom: "1.5rem",
              paddingBottom: "1rem",
              borderBottom: "1px solid var(--border-color)",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem"
            }}
          >
            <span className="brand-icon">
              <UtensilsCrossed size={18} />
            </span>
            <span style={{ fontWeight: 800, fontSize: "1.2rem", color: "var(--text-main)" }}>
              Foodly Admin
            </span>
          </div>

          <ul className="dash-nav-list">
            <li>
              <button
                onClick={() => setActiveTab("Dashboard")}
                className={`dash-nav-item ${activeTab === "Dashboard" ? "active" : ""}`}
                style={{ width: "100%", textAlign: "left", background: "none", border: "none" }}
              >
                <LayoutDashboard size={18} /> Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("Restaurants")}
                className={`dash-nav-item ${activeTab === "Restaurants" ? "active" : ""}`}
                style={{ width: "100%", textAlign: "left", background: "none", border: "none" }}
              >
                <Store size={18} /> Restaurants
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("Menu Items")}
                className={`dash-nav-item ${activeTab === "Menu Items" ? "active" : ""}`}
                style={{ width: "100%", textAlign: "left", background: "none", border: "none" }}
              >
                <UtensilsCrossed size={18} /> Menu Items
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("Orders")}
                className={`dash-nav-item ${activeTab === "Orders" ? "active" : ""}`}
                style={{ width: "100%", textAlign: "left", background: "none", border: "none" }}
              >
                <ShoppingBag size={18} /> Orders
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("Users")}
                className={`dash-nav-item ${activeTab === "Users" ? "active" : ""}`}
                style={{ width: "100%", textAlign: "left", background: "none", border: "none" }}
              >
                <Users size={18} /> Users
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("Settings")}
                className={`dash-nav-item ${activeTab === "Settings" ? "active" : ""}`}
                style={{ width: "100%", textAlign: "left", background: "none", border: "none" }}
              >
                <Settings size={18} /> Settings
              </button>
            </li>
            <li
              className="dash-nav-item"
              onClick={() => setIsLogoutModalOpen(true)}
              style={{ color: "#ef4444", marginTop: "1.5rem", cursor: "pointer" }}
            >
              <LogOut size={18} /> Logout
            </li>
          </ul>
        </aside>

        {/* Main Content Area based on activeTab */}
        <main style={{ minHeight: "650px" }}>
          {/* TAB 1: DASHBOARD */}
          {activeTab === "Dashboard" && (
            <div>
              <div className="section-header" style={{ marginBottom: "1.5rem" }}>
                <div>
                  <h1 className="section-title">Admin Dashboard</h1>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
                    Overview of performance, revenue, and active orders
                  </span>
                </div>
              </div>

              {/* KPI Metrics Cards */}
              <div className="dash-kpi-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
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

                <div className="kpi-card">
                  <div>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Restaurants</span>
                    <div className="kpi-val">{totalRestaurantsCount}</div>
                  </div>
                  <div className="kpi-icon-box" style={{ background: "#e0f2fe", color: "#0284c7" }}>
                    <Store size={22} />
                  </div>
                </div>
              </div>

              {/* Recent Orders Table */}
              <div style={{ background: "white", borderRadius: "12px", border: "1px solid var(--border-color)", padding: "1.5rem" }}>
                <div className="section-header" style={{ marginBottom: "1.2rem" }}>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>Recent Orders</h3>
                  <button
                    onClick={() => setActiveTab("Orders")}
                    style={{ background: "none", border: "none", color: "var(--primary)", fontSize: "0.88rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.2rem", cursor: "pointer" }}
                  >
                    View All Orders <ArrowUpRight size={14} />
                  </button>
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
                    {orders.slice(0, 5).map((order) => (
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
            </div>
          )}

          {/* TAB 2: RESTAURANTS MANAGEMENT */}
          {activeTab === "Restaurants" && (
            <div>
              <div className="section-header" style={{ marginBottom: "1.5rem" }}>
                <div>
                  <h1 className="section-title">Restaurants Management</h1>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
                    Add new partner restaurants, edit profiles, or manage active listings
                  </span>
                </div>

                <button
                  onClick={() => {
                    setEditingRestaurant(null);
                    setIsRestModalOpen(true);
                  }}
                  className="btn-primary"
                  style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <Plus size={16} /> Add Restaurant
                </button>
              </div>

              {/* Search & Filter Bar */}
              <div style={{ marginBottom: "1.2rem", display: "flex", gap: "1rem" }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Search restaurant by name or cuisine..."
                    value={restSearch}
                    onChange={(e) => setRestSearch(e.target.value)}
                    style={{ paddingLeft: "2.3rem" }}
                  />
                </div>
              </div>

              {/* Restaurants Table */}
              <div style={{ background: "white", borderRadius: "12px", border: "1px solid var(--border-color)", overflow: "hidden" }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Logo</th>
                      <th>Restaurant Name</th>
                      <th>Cuisine</th>
                      <th>Price & Rating</th>
                      <th>Delivery</th>
                      <th>Featured</th>
                      <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRestaurants.length > 0 ? (
                      filteredRestaurants.map((r) => (
                        <tr key={r.id}>
                          <td>
                            <img
                              src={r.image}
                              alt={r.name}
                              style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover" }}
                            />
                          </td>
                          <td>
                            <strong style={{ fontSize: "0.95rem", display: "block" }}>{r.name}</strong>
                            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{r.description?.slice(0, 45)}...</span>
                          </td>
                          <td>
                            <span style={{ background: "#f3f4f6", padding: "0.2rem 0.6rem", borderRadius: "6px", fontSize: "0.82rem", fontWeight: 600 }}>
                              {r.cuisine}
                            </span>
                          </td>
                          <td>
                            <div>
                              <strong>{r.priceTier}</strong> • <span style={{ color: "#d97706", fontWeight: 700 }}>★ {r.rating}</span>
                            </div>
                          </td>
                          <td style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>{r.deliveryTime}</td>
                          <td>
                            {r.featured ? (
                              <span style={{ background: "#dcfce7", color: "#16a34a", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.78rem", fontWeight: 700 }}>
                                Featured
                              </span>
                            ) : (
                              <span style={{ background: "#f3f4f6", color: "#6b7280", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.78rem" }}>
                                Standard
                              </span>
                            )}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.6rem" }}>
                              <button
                                onClick={() => {
                                  setEditingRestaurant(r);
                                  setIsRestModalOpen(true);
                                }}
                                className="action-icon-btn"
                                title="Edit restaurant"
                                style={{ width: "32px", height: "32px" }}
                              >
                                <Edit2 size={15} />
                              </button>
                              <button
                                onClick={() => deleteRestaurant(r.id)}
                                className="action-icon-btn"
                                title="Delete restaurant"
                                style={{ width: "32px", height: "32px", color: "#ef4444" }}
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                          No restaurants found matching &quot;{restSearch}&quot;.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: MENU ITEMS */}
          {activeTab === "Menu Items" && (
            <div>
              <div className="section-header" style={{ marginBottom: "1.5rem" }}>
                <div>
                  <h1 className="section-title">Menu Items Management</h1>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
                    Create food items, update pricing, categories, and descriptions
                  </span>
                </div>

                <button
                  onClick={() => {
                    setEditingMenuItem(null);
                    setIsMenuModalOpen(true);
                  }}
                  className="btn-primary"
                  style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <Plus size={16} /> Add Menu Item
                </button>
              </div>

              {/* Search Bar */}
              <div style={{ marginBottom: "1.2rem", display: "flex", gap: "1rem" }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Search menu item by name or category..."
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    style={{ paddingLeft: "2.3rem" }}
                  />
                </div>
              </div>

              {/* Menu Items Table */}
              <div style={{ background: "white", borderRadius: "12px", border: "1px solid var(--border-color)", overflow: "hidden" }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMenuItems.length > 0 ? (
                      filteredMenuItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{ width: "44px", height: "44px", borderRadius: "8px", objectFit: "cover" }}
                            />
                          </td>
                          <td>
                            <strong style={{ fontSize: "0.95rem", display: "block" }}>{item.name}</strong>
                            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{item.description?.slice(0, 40)}...</span>
                          </td>
                          <td style={{ color: "var(--text-muted)" }}>{item.category}</td>
                          <td>
                            <strong>${item.price.toFixed(2)}</strong>
                          </td>
                          <td>
                            <span className="status-pill status-delivered">
                              {item.status || "Active"}
                            </span>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.6rem" }}>
                              <button
                                onClick={() => {
                                  setEditingMenuItem(item);
                                  setIsMenuModalOpen(true);
                                }}
                                className="action-icon-btn"
                                title="Edit item"
                                style={{ width: "32px", height: "32px" }}
                              >
                                <Edit2 size={15} />
                              </button>
                              <button
                                onClick={() => deleteMenuItem(item.id)}
                                className="action-icon-btn"
                                title="Delete item"
                                style={{ width: "32px", height: "32px", color: "#ef4444" }}
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                          No menu items found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: ORDERS */}
          {activeTab === "Orders" && (
            <div>
              <div className="section-header" style={{ marginBottom: "1.5rem" }}>
                <div>
                  <h1 className="section-title">Orders Management</h1>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
                    Monitor customer orders and update real-time fulfillment statuses
                  </span>
                </div>
              </div>

              {/* Status Filter Tabs & Search */}
              <div style={{ marginBottom: "1.2rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "1rem" }}>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {["All", "Preparing", "Out for Delivery", "Delivered", "Cancelled"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setOrderStatusFilter(status)}
                      style={{
                        padding: "0.45rem 0.9rem",
                        borderRadius: "8px",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        border: "1px solid var(--border-color)",
                        background: orderStatusFilter === status ? "var(--primary)" : "white",
                        color: orderStatusFilter === status ? "white" : "var(--text-main)",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <div style={{ position: "relative", width: "260px" }}>
                  <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Search Order ID or Name..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    style={{ paddingLeft: "2.3rem" }}
                  />
                </div>
              </div>

              {/* Orders Table */}
              <div style={{ background: "white", borderRadius: "12px", border: "1px solid var(--border-color)", overflow: "hidden" }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer Details</th>
                      <th>Restaurant</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Update Status</th>
                      <th style={{ textAlign: "right" }}>View Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr key={order.id}>
                          <td>
                            <strong style={{ color: "var(--primary)" }}>#{order.id}</strong>
                          </td>
                          <td>
                            <strong>{order.customer}</strong>
                            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{order.phone || order.customerEmail}</div>
                          </td>
                          <td>{order.restaurantName || "Pizza Paradise"}</td>
                          <td>
                            <strong>${order.total.toFixed(2)}</strong>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{order.paymentMethod}</div>
                          </td>
                          <td>
                            <span className={`status-pill ${getStatusClass(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{order.date}</td>
                          <td>
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              style={{ padding: "0.35rem 0.6rem", borderRadius: "6px", border: "1px solid var(--border-color)", fontSize: "0.82rem", outline: "none", cursor: "pointer" }}
                            >
                              <option value="Preparing">Preparing</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <button
                              onClick={() => setSelectedOrderDetails(order)}
                              className="action-icon-btn"
                              title="View full order details"
                              style={{ width: "32px", height: "32px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                            >
                              <Eye size={15} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                          No orders found matching filter criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: USERS */}
          {activeTab === "Users" && (
            <div>
              <div className="section-header" style={{ marginBottom: "1.5rem" }}>
                <div>
                  <h1 className="section-title">User Management</h1>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
                    Manage customer accounts, system administrators, and user privileges
                  </span>
                </div>

                <button
                  onClick={() => setIsUserModalOpen(true)}
                  className="btn-primary"
                  style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <Plus size={16} /> Add User
                </button>
              </div>

              {/* Search Bar */}
              <div style={{ marginBottom: "1.2rem", display: "flex", gap: "1rem" }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Search user by name or email..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    style={{ paddingLeft: "2.3rem" }}
                  />
                </div>
              </div>

              {/* Users Table */}
              <div style={{ background: "white", borderRadius: "12px", border: "1px solid var(--border-color)", overflow: "hidden" }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((u) => (
                        <tr key={u.id}>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                              <div
                                style={{
                                  width: "38px",
                                  height: "38px",
                                  borderRadius: "50%",
                                  background: u.role === "admin" ? "var(--primary-light)" : "#e5e7eb",
                                  color: u.role === "admin" ? "var(--primary)" : "#4b5563",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: 700,
                                  fontSize: "0.95rem"
                                }}
                              >
                                {u.name ? u.name.charAt(0).toUpperCase() : "U"}
                              </div>
                              <strong>{u.name}</strong>
                            </div>
                          </td>
                          <td style={{ color: "var(--text-muted)" }}>{u.email}</td>
                          <td style={{ color: "var(--text-muted)" }}>{u.phone || "+92 300 1234567"}</td>
                          <td>
                            {u.role === "admin" ? (
                              <span style={{ background: "#fee2e2", color: "#dc2626", padding: "0.2rem 0.65rem", borderRadius: "12px", fontSize: "0.78rem", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                                <Shield size={12} /> Admin
                              </span>
                            ) : (
                              <span style={{ background: "#e0f2fe", color: "#0284c7", padding: "0.2rem 0.65rem", borderRadius: "12px", fontSize: "0.78rem", fontWeight: 700 }}>
                                Customer
                              </span>
                            )}
                          </td>
                          <td>
                            <span style={{ color: "#16a34a", fontWeight: 600, fontSize: "0.85rem" }}>Active</span>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                              <button
                                onClick={() => toggleUserRole(u.id)}
                                className="btn-secondary"
                                style={{ padding: "0.3rem 0.6rem", fontSize: "0.78rem" }}
                                title="Switch role between Admin and User"
                              >
                                Toggle Role
                              </button>
                              <button
                                onClick={() => deleteUser(u.id)}
                                className="action-icon-btn"
                                title="Delete user account"
                                style={{ width: "32px", height: "32px", color: "#ef4444" }}
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                          No registered users found matching &quot;{userSearch}&quot;.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === "Settings" && (
            <div>
              <div className="section-header" style={{ marginBottom: "1.5rem" }}>
                <div>
                  <h1 className="section-title">Platform Settings</h1>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
                    Configure store preferences, delivery charges, and system configurations
                  </span>
                </div>
              </div>

              {settingsSavedToast && (
                <div style={{ background: "#dcfce7", border: "1px solid #86efac", color: "#15803d", padding: "0.9rem 1.2rem", borderRadius: "8px", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600 }}>
                  <CheckCircle size={18} /> Settings saved successfully!
                </div>
              )}

              <form onSubmit={handleSaveSettings} style={{ background: "white", borderRadius: "12px", border: "1px solid var(--border-color)", padding: "2rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.2rem", color: "var(--text-main)", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.5rem" }}>
                  General Information
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.5rem" }}>
                  <div className="form-group">
                    <label className="form-label">Platform Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={settingsForm.siteName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, siteName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Support Email Address</label>
                    <input
                      type="email"
                      className="form-input"
                      value={settingsForm.supportEmail}
                      onChange={(e) => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.2rem", color: "var(--text-main)", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.5rem" }}>
                  Fulfillment & Delivery Charges
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.2rem", marginBottom: "1.5rem" }}>
                  <div className="form-group">
                    <label className="form-label">Standard Delivery Fee ($)</label>
                    <input
                      type="number"
                      step="0.50"
                      className="form-input"
                      value={settingsForm.deliveryFee}
                      onChange={(e) => setSettingsForm({ ...settingsForm, deliveryFee: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Free Delivery Threshold ($)</label>
                    <input
                      type="number"
                      step="1"
                      className="form-input"
                      value={settingsForm.freeDeliveryOver}
                      onChange={(e) => setSettingsForm({ ...settingsForm, freeDeliveryOver: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Currency Symbol</label>
                    <input
                      type="text"
                      className="form-input"
                      value={settingsForm.currency}
                      onChange={(e) => setSettingsForm({ ...settingsForm, currency: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.2rem", color: "var(--text-main)", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.5rem" }}>
                  System Maintenance
                </h3>

                <div className="form-group" style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "2rem" }}>
                  <input
                    type="checkbox"
                    id="maint-mode"
                    checked={settingsForm.maintenanceMode}
                    onChange={(e) => setSettingsForm({ ...settingsForm, maintenanceMode: e.target.checked })}
                    style={{ width: "20px", height: "20px", accentColor: "var(--primary)", cursor: "pointer" }}
                  />
                  <label htmlFor="maint-mode" style={{ fontWeight: 600, cursor: "pointer" }}>
                    Enable Maintenance Mode (Restricts Ordering for Customers)
                  </label>
                </div>

                <button type="submit" className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Save size={18} /> Save Settings
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />

      <AddEditRestaurantModal
        isOpen={isRestModalOpen}
        onClose={() => setIsRestModalOpen(false)}
        restaurant={editingRestaurant}
        onSave={(data) => {
          if (editingRestaurant) {
            updateRestaurant(editingRestaurant.id, data);
          } else {
            addRestaurant(data);
          }
        }}
      />

      <AddEditItemModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        item={editingMenuItem}
        onSave={(data) => {
          if (editingMenuItem) {
            updateMenuItem(editingMenuItem.id, data);
          } else {
            addMenuItem(data);
          }
        }}
      />

      <AddEditUserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSave={(data) => {
          addUser(data);
        }}
      />

      {/* Order Details Popup Modal */}
      {selectedOrderDetails && (
        <div className="modal-overlay" onClick={() => setSelectedOrderDetails(null)}>
          <div className="modal-content" style={{ maxWidth: "550px" }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Order #{selectedOrderDetails.id}</h3>
              <button onClick={() => setSelectedOrderDetails(null)} className="action-icon-btn">
                <X size={20} />
              </button>
            </div>

            <div style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
              <div style={{ background: "#f9fafb", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
                <p><strong>Customer Name:</strong> {selectedOrderDetails.customer}</p>
                <p><strong>Email:</strong> {selectedOrderDetails.customerEmail || "N/A"}</p>
                <p><strong>Phone:</strong> {selectedOrderDetails.phone || "N/A"}</p>
                <p><strong>Delivery Address:</strong> {selectedOrderDetails.address || "N/A"}</p>
                <p><strong>Payment Method:</strong> {selectedOrderDetails.paymentMethod}</p>
              </div>

              <h4 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Order Items</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
                {selectedOrderDetails.items?.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.4rem" }}>
                    <span>{item.quantity || 1}x {item.name}</span>
                    <strong>${(item.price * (item.quantity || 1)).toFixed(2)}</strong>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.05rem", fontWeight: 800, borderTop: "2px solid var(--border-color)", paddingTop: "0.8rem" }}>
                <span>Total Amount:</span>
                <span style={{ color: "var(--primary)" }}>${selectedOrderDetails.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
