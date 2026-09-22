"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, ShoppingBag, MapPin, CreditCard, Settings, LogOut, ChevronRight, Plus, Edit2, Trash2, CheckCircle2, ShieldCheck, X, Camera } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import LogoutModal from "@/components/LogoutModal";

export default function UserDashboardPage() {
  const router = useRouter();
  const { user, logout, updateUser } = useAuth();
  const { orders } = useOrders();
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const photoInputRef = useRef(null);
  const [pendingPhoto, setPendingPhoto] = useState(null);
  const [photoError, setPhotoError] = useState("");

  const handleConfirmLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    router.push("/login");
  };

  // Success Confirmation Notice State
  const [confirmationNotice, setConfirmationNotice] = useState(null);

  const showConfirmation = (message) => {
    setConfirmationNotice(message);
    setTimeout(() => {
      setConfirmationNotice(null);
    }, 4000);
  };

  // Address Form State
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    title: "Home",
    recipient: user?.name || "Sulaima Khalil",
    phone: user?.phone || "+92 300 1234567",
    address: user?.address || "House 12, Qasim Pur Colony, Multan",
    isDefault: false
  });

  const addresses = user?.addresses || [];

  // Payment Method Form State
  const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(false);
  const [editingPaymentId, setEditingPaymentId] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    type: "Visa Card",
    cardHolder: user?.name || "Sulaima Khalil",
    cardNumber: "",
    expiry: "",
    isDefault: false
  });

  const paymentMethods = user?.paymentMethods || [];

  const getStatusClass = (status) => {
    if (status === "Delivered") return "status-delivered";
    if (status === "Preparing" || status === "Out for Delivery") return "status-preparing";
    return "status-cancelled";
  };

  const userOrders = orders.filter((o) => o.customerEmail === user?.email || true);
  const activeOrdersCount = userOrders.filter((o) => o.status === "Preparing" || o.status === "Out for Delivery").length;
  const totalSpent = userOrders.reduce((total, order) => total + (order.total || 0), 0);

  // --- ADDRESS HANDLERS ---
  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    setAddressForm({
      title: "Home",
      recipient: user?.name || "Sulaima Khalil",
      phone: user?.phone || "+92 300 1234567",
      address: "",
      isDefault: addresses.length === 0
    });
    setIsAddressFormOpen(true);
  };

  const handleOpenEditAddress = (addr) => {
    setEditingAddressId(addr.id);
    setAddressForm({
      title: addr.title,
      recipient: addr.recipient,
      phone: addr.phone,
      address: addr.address,
      isDefault: addr.isDefault
    });
    setIsAddressFormOpen(true);
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!addressForm.address) return;

    let updatedList = [];
    if (editingAddressId) {
      updatedList = addresses.map((a) => {
        if (a.id === editingAddressId) {
          return { ...a, ...addressForm };
        }
        if (addressForm.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      });
    } else {
      const newAddr = {
        id: `addr-${Date.now()}`,
        ...addressForm
      };
      if (addressForm.isDefault) {
        updatedList = addresses.map((a) => ({ ...a, isDefault: false }));
        updatedList.push(newAddr);
      } else {
        updatedList = [...addresses, newAddr];
      }
    }

    const defaultAddrObj = updatedList.find((a) => a.isDefault) || updatedList[0];

    updateUser({
      addresses: updatedList,
      address: defaultAddrObj ? defaultAddrObj.address : user.address
    });

    setIsAddressFormOpen(false);
    showConfirmation("Address setting updated & saved successfully!");
  };

  const handleDeleteAddress = (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    if (updated.length > 0 && !updated.some((a) => a.isDefault)) {
      updated[0].isDefault = true;
    }
    const defaultAddrObj = updated.find((a) => a.isDefault);
    updateUser({
      addresses: updated,
      address: defaultAddrObj ? defaultAddrObj.address : ""
    });
    showConfirmation("Address removed successfully.");
  };

  const handleSetDefaultAddress = (id) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id
    }));
    const defaultAddrObj = updated.find((a) => a.id === id);
    updateUser({
      addresses: updated,
      address: defaultAddrObj.address
    });
    showConfirmation("Default delivery address updated!");
  };

  // --- PAYMENT METHOD HANDLERS ---
  const handleOpenAddPayment = () => {
    setEditingPaymentId(null);
    setPaymentForm({
      type: "Visa Card",
      cardHolder: user?.name || "Sulaima Khalil",
      cardNumber: "",
      expiry: "",
      isDefault: false
    });
    setIsPaymentFormOpen(true);
  };

  const handleSavePaymentMethod = (e) => {
    e.preventDefault();
    if (!paymentForm.cardNumber) return;

    // Mask card number for display
    const rawNumber = paymentForm.cardNumber.replace(/\s+/g, "");
    const masked = rawNumber.length >= 4 ? `•••• •••• •••• ${rawNumber.slice(-4)}` : paymentForm.cardNumber;

    let updatedList = [];
    if (editingPaymentId) {
      updatedList = paymentMethods.map((pm) => {
        if (pm.id === editingPaymentId) {
          return { ...pm, ...paymentForm, cardNumber: masked };
        }
        if (paymentForm.isDefault) {
          return { ...pm, isDefault: false };
        }
        return pm;
      });
    } else {
      const newPm = {
        id: `pm-${Date.now()}`,
        ...paymentForm,
        cardNumber: masked
      };
      if (paymentForm.isDefault) {
        updatedList = paymentMethods.map((pm) => ({ ...pm, isDefault: false }));
        updatedList.push(newPm);
      } else {
        updatedList = [...paymentMethods, newPm];
      }
    }

    updateUser({
      paymentMethods: updatedList
    });

    setIsPaymentFormOpen(false);
    showConfirmation("Payment method saved successfully!");
  };

  const handleDeletePayment = (id) => {
    const updated = paymentMethods.filter((pm) => pm.id !== id);
    updateUser({ paymentMethods: updated });
    showConfirmation("Payment method removed.");
  };

  const handleSetDefaultPayment = (id) => {
    const updated = paymentMethods.map((pm) => ({
      ...pm,
      isDefault: pm.id === id
    }));
    updateUser({ paymentMethods: updated });
    showConfirmation("Default payment method updated!");
  };

  // --- SETTINGS HANDLER ---
  const handleSaveSettings = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateUser({
      name: formData.get("name")?.trim() || user?.name,
      email: formData.get("email")?.trim() || user?.email,
      phone: formData.get("phone")?.trim() || user?.phone,
      ...(pendingPhoto ? { avatar: pendingPhoto } : {})
    });
    setPendingPhoto(null);
    showConfirmation("Account profile settings saved successfully!");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhotoError("Please choose an image file.");
      return;
    }
    if (file.size > 800 * 1024) {
      setPhotoError("Please choose an image smaller than 800 KB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPendingPhoto(reader.result);
      setPhotoError("");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="container">
      {/* Screen 8: User Dashboard Layout */}
      <div className="page-sidebar-layout profile-layout">
        {/* Left Dashboard Sidebar */}
        <aside className="dashboard-sidebar-nav profile-sidebar">
          <div className="dash-user-profile">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
              alt={user?.name || "User"}
              className="dash-avatar"
            />
            <div>
              <h4 style={{ fontWeight: 700, fontSize: "0.95rem" }}>{user?.name || "Sulaima Khalil"}</h4>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{user?.email || "sulaima@email.com"}</span>
              <button className="change-profile-photo-link" onClick={() => setActiveNav("Settings")}>Change profile photo</button>
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
              onClick={() => setIsLogoutModalOpen(true)}
              style={{ color: "#ef4444", marginTop: "1rem" }}
            >
              <LogOut size={18} /> Logout
            </li>
          </ul>
        </aside>

        {/* Main Content Area */}
        <main className="profile-main">
          {/* CONFIRMATION CARD NOTICE */}
          {confirmationNotice && (
            <div
              style={{
                background: "#ecfdf5",
                border: "1px solid #a7f3d0",
                borderRadius: "12px",
                padding: "1rem 1.2rem",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "#065f46",
                boxShadow: "var(--shadow-sm)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <CheckCircle2 size={22} color="#059669" />
                <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{confirmationNotice}</span>
              </div>
              <button
                onClick={() => setConfirmationNotice(null)}
                style={{ color: "#065f46", background: "none", border: "none", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>
          )}

          <div className="section-header" style={{ marginBottom: "1.5rem" }}>
            <h1 className="section-title">{activeNav}</h1>
            {activeNav === "Addresses" && !isAddressFormOpen && (
              <button onClick={handleOpenAddAddress} className="btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.88rem" }}>
                <Plus size={16} /> Add New Address
              </button>
            )}
            {activeNav === "Payment Methods" && !isPaymentFormOpen && (
              <button onClick={handleOpenAddPayment} className="btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.88rem" }}>
                <Plus size={16} /> Add Payment Method
              </button>
            )}
          </div>

          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeNav === "Dashboard" && (
            <div className="profile-dashboard-overview">
              <div className="profile-welcome-card">
                <div>
                  <span className="hero-tag">Your Foodly account</span>
                  <h2>Welcome back, {user?.name?.split(" ")[0] || "there"}!</h2>
                  <p>Track your latest orders and manage your delivery details in one place.</p>
                </div>
                <button className="btn-primary" onClick={() => setActiveNav("My Orders")}>View My Orders</button>
              </div>

              <div className="profile-summary-grid">
                <div className="profile-summary-card">
                  <ShoppingBag size={20} />
                  <div><span>Total Orders</span><strong>{userOrders.length}</strong></div>
                </div>
                <div className="profile-summary-card">
                  <ChevronRight size={20} />
                  <div><span>Active Orders</span><strong>{activeOrdersCount}</strong></div>
                </div>
                <div className="profile-summary-card">
                  <CreditCard size={20} />
                  <div><span>Total Spent</span><strong>${totalSpent.toFixed(2)}</strong></div>
                </div>
              </div>

              <div className="profile-recent-section">
                <div className="section-header">
                  <div>
                    <h3>Recent Orders</h3>
                    <p>Your latest Foodly activity</p>
                  </div>
                  <button className="view-all-link" onClick={() => setActiveNav("My Orders")}>View all <ChevronRight size={16} /></button>
                </div>
                <div className="profile-recent-list">
                  {userOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="profile-recent-order">
                      <div><strong>#{order.id}</strong><span>{order.restaurantName || "Pizza Paradise"}</span></div>
                      <span className={`status-pill ${getStatusClass(order.status)}`}>{order.status}</span>
                      <strong>${order.total.toFixed(2)}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COMPLETE ORDER HISTORY */}
          {activeNav === "My Orders" && (
            <div className="profile-order-list">
              {userOrders.map((order) => (
                <div key={order.id} className="profile-order-card">
                  <div className="profile-order-header">
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

                  <div className="profile-order-footer">
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
                    <div className="profile-order-details">
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
          )}

          {/* TAB 2: ADDRESSES TAB */}
          {activeNav === "Addresses" && (
            <div>
              {/* Add / Edit Address Form */}
              {isAddressFormOpen && (
                <div className="profile-form-card">
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1.2rem", color: "var(--primary)" }}>
                    {editingAddressId ? "Edit Delivery Address" : "Add New Delivery Address"}
                  </h3>

                  <form onSubmit={handleSaveAddress}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div className="form-group">
                        <label className="form-label">Address Tag / Title</label>
                        <select
                          className="form-input"
                          value={addressForm.title}
                          onChange={(e) => setAddressForm({ ...addressForm, title: e.target.value })}
                        >
                          <option value="Home">Home</option>
                          <option value="Office / Work">Office / Work</option>
                          <option value="Apartment">Apartment</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Recipient Name</label>
                        <input
                          type="text"
                          className="form-input"
                          value={addressForm.recipient}
                          onChange={(e) => setAddressForm({ ...addressForm, recipient: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="text"
                        className="form-input"
                        value={addressForm.phone}
                        onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Full Street Address</label>
                      <textarea
                        className="form-input"
                        rows={3}
                        value={addressForm.address}
                        onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                        placeholder="House / Street Number, Area, City"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          checked={addressForm.isDefault}
                          onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                          style={{ accentColor: "var(--primary)", width: "16px", height: "16px" }}
                        />
                        <span>Set as default delivery address</span>
                      </label>
                    </div>

                    <div style={{ display: "flex", gap: "1rem", marginTop: "1.2rem" }}>
                      <button type="submit" className="btn-primary">
                        Save Address
                      </button>
                      <button type="button" onClick={() => setIsAddressFormOpen(false)} className="btn-secondary">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Address Cards List */}
              <div className="profile-card-list">
                {addresses.map((addr) => (
                  <div className="profile-address-card"
                    key={addr.id}
                    style={{
                      background: "white",
                      borderRadius: "12px",
                      border: addr.isDefault ? "2px solid var(--primary)" : "1px solid var(--border-color)",
                      padding: "1.5rem",
                      position: "relative"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.8rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <MapPin size={20} color="var(--primary)" />
                        <h4 style={{ fontSize: "1.1rem", fontWeight: 700 }}>{addr.title}</h4>
                        {addr.isDefault && (
                          <span
                            style={{
                              background: "var(--primary-light)",
                              color: "var(--primary)",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              padding: "0.25rem 0.6rem",
                              borderRadius: "99px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.25rem"
                            }}
                          >
                            <CheckCircle2 size={12} /> Default Address
                          </span>
                        )}
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <button
                          onClick={() => handleOpenEditAddress(addr)}
                          className="action-icon-btn"
                          title="Edit address"
                          style={{ width: "32px", height: "32px" }}
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="action-icon-btn"
                          title="Delete address"
                          style={{ width: "32px", height: "32px", color: "#ef4444" }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    <p style={{ fontWeight: 600, fontSize: "0.92rem", marginBottom: "0.2rem" }}>{addr.recipient}</p>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "0.4rem" }}>{addr.address}</p>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-light)" }}>Phone: {addr.phone}</span>

                    {!addr.isDefault && (
                      <div style={{ marginTop: "1rem", paddingTop: "0.8rem", borderTop: "1px solid var(--border-light)" }}>
                        <button
                          onClick={() => handleSetDefaultAddress(addr.id)}
                          style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--primary)", background: "none", border: "none", cursor: "pointer" }}
                        >
                          Set as Default
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PAYMENT METHODS TAB */}
          {activeNav === "Payment Methods" && (
            <div>
              {/* Add Payment Method Form */}
              {isPaymentFormOpen && (
                <div className="profile-form-card">
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1.2rem", color: "var(--primary)" }}>
                    Add New Payment Method
                  </h3>

                  <form onSubmit={handleSavePaymentMethod}>
                    <div className="form-group">
                      <label className="form-label">Card Type</label>
                      <select
                        className="form-input"
                        value={paymentForm.type}
                        onChange={(e) => setPaymentForm({ ...paymentForm, type: e.target.value })}
                      >
                        <option value="Visa Card">Visa Credit / Debit Card</option>
                        <option value="MasterCard">MasterCard</option>
                        <option value="American Express">American Express</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Cardholder Name</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Sulaima Khalil"
                        value={paymentForm.cardHolder}
                        onChange={(e) => setPaymentForm({ ...paymentForm, cardHolder: e.target.value })}
                        required
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "1rem" }}>
                      <div className="form-group">
                        <label className="form-label">Card Number</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="4532 1234 5678 9012"
                          maxLength={19}
                          value={paymentForm.cardNumber}
                          onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Expiry</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="MM/YY"
                          maxLength={5}
                          value={paymentForm.expiry}
                          onChange={(e) => setPaymentForm({ ...paymentForm, expiry: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">CVC</label>
                        <input
                          type="password"
                          className="form-input"
                          placeholder="123"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          checked={paymentForm.isDefault}
                          onChange={(e) => setPaymentForm({ ...paymentForm, isDefault: e.target.checked })}
                          style={{ accentColor: "var(--primary)", width: "16px", height: "16px" }}
                        />
                        <span>Set as default payment method</span>
                      </label>
                    </div>

                    <div style={{ display: "flex", gap: "1rem", marginTop: "1.2rem" }}>
                      <button type="submit" className="btn-primary">
                        Save Payment Method
                      </button>
                      <button type="button" onClick={() => setIsPaymentFormOpen(false)} className="btn-secondary">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Payment Method Cards */}
              <div className="profile-card-list">
                {paymentMethods.map((pm) => (
                  <div className="profile-payment-card"
                    key={pm.id}
                    style={{
                      background: "white",
                      padding: "1.5rem",
                      borderRadius: "12px",
                      border: pm.isDefault ? "2px solid var(--primary)" : "1px solid var(--border-color)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "10px", background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <CreditCard size={24} />
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <strong style={{ fontSize: "1rem" }}>{pm.type}</strong>
                          {pm.isDefault && (
                            <span style={{ background: "var(--primary-light)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: "99px" }}>
                              Default
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>{pm.cardNumber}</p>
                        {pm.expiry !== "N/A" && (
                          <span style={{ fontSize: "0.78rem", color: "var(--text-light)" }}>Expires {pm.expiry} • {pm.cardHolder}</span>
                        )}
                      </div>
                    </div>

                    {pm.type !== "Cash on Delivery" && (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                        {!pm.isDefault && (
                          <button
                            onClick={() => handleSetDefaultPayment(pm.id)}
                            style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--primary)", background: "none", border: "none", cursor: "pointer" }}
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          onClick={() => handleDeletePayment(pm.id)}
                          className="action-icon-btn"
                          title="Delete payment method"
                          style={{ width: "32px", height: "32px", color: "#ef4444" }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SETTINGS */}
          {activeNav === "Settings" && (
            <div className="profile-settings-card">
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.2rem" }}>Account Settings</h3>
              <form onSubmit={handleSaveSettings}>
                <div className="profile-photo-control">
                  <img
                    src={pendingPhoto || user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                    alt="Profile preview"
                    className="profile-photo-preview"
                  />
                  <div>
                    <span className="form-label">Profile Photo</span>
                    <p className="profile-photo-help">Upload a JPG, PNG, or WebP image up to 800 KB.</p>
                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handlePhotoChange}
                      className="profile-photo-input"
                    />
                    <button type="button" className="btn-secondary profile-photo-button" onClick={() => photoInputRef.current?.click()}>
                      <Camera size={16} /> Choose Photo
                    </button>
                    {photoError && <p className="profile-photo-error">{photoError}</p>}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input name="name" type="text" className="form-input" defaultValue={user?.name || "Sulaima Khalil"} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input name="email" type="email" className="form-input" defaultValue={user?.email || "sulaima@email.com"} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input name="phone" type="text" className="form-input" defaultValue={user?.phone || "+92 300 1234567"} />
                </div>
                <button type="submit" className="btn-primary" style={{ marginTop: "1rem" }}>
                  Save Profile Settings
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}
