"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, UtensilsCrossed, ShoppingBag, Users, Settings, LogOut, Plus, Edit2, Trash2, Store } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import AddEditItemModal from "@/components/AddEditItemModal";

export default function AdminMenuPage() {
  const { logout } = useAuth();
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useOrders();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = (itemData) => {
    if (editingItem) {
      updateMenuItem(editingItem.id, itemData);
    } else {
      addMenuItem(itemData);
    }
  };

  return (
    <div className="container">
      {/* Screen 10: Admin Menu Management */}
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
              <Link href="/admin" className="dash-nav-item">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin" className="dash-nav-item">
                <Store size={18} /> Restaurants
              </Link>
            </li>
            <li>
              <Link href="/admin/menu" className="dash-nav-item active">
                <UtensilsCrossed size={18} /> Menu Items
              </Link>
            </li>
            <li>
              <Link href="/admin" className="dash-nav-item">
                <ShoppingBag size={18} /> Orders
              </Link>
            </li>
            <li>
              <Link href="/admin" className="dash-nav-item">
                <Users size={18} /> Users
              </Link>
            </li>
            <li>
              <Link href="/admin" className="dash-nav-item">
                <Settings size={18} /> Settings
              </Link>
            </li>
            <li className="dash-nav-item" onClick={logout} style={{ color: "#ef4444", marginTop: "1.5rem" }}>
              <LogOut size={18} /> Logout
            </li>
          </ul>
        </aside>

        {/* Main Content Area */}
        <main>
          <div className="section-header" style={{ marginBottom: "1.5rem" }}>
            <div>
              <h1 className="section-title">Menu Items</h1>
              <span style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
                Manage food items, pricing, and availability
              </span>
            </div>

            <button onClick={handleOpenAddModal} className="btn-primary">
              <Plus size={16} /> Add Item
            </button>
          </div>

          {/* Menu Items Table (Screen 10) */}
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
                {menuItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "44px", height: "44px", borderRadius: "8px", objectFit: "cover" }}
                      />
                    </td>
                    <td>
                      <strong style={{ fontSize: "0.95rem" }}>{item.name}</strong>
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
                          onClick={() => handleOpenEditModal(item)}
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
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Add / Edit Item Modal */}
      <AddEditItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        item={editingItem}
      />
    </div>
  );
}
