"use client";

import React from "react";
import { LogOut, X } from "lucide-react";

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "420px", textAlign: "center", padding: "2.2rem 1.8rem" }}>
        <button onClick={onClose} className="action-icon-btn" style={{ position: "absolute", top: "16px", right: "16px" }} aria-label="Close modal">
          <X size={18} />
        </button>

        <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#fef2f2", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.2rem" }}>
          <LogOut size={28} />
        </div>

        <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem" }}>Confirm Logout</h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.8rem" }}>
          Are you sure you want to log out of your Foodly account?
        </p>

        <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center" }}>
          <button onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>
            Cancel
          </button>
          <button onClick={onConfirm} className="btn-danger" style={{ flex: 1, padding: "0.65rem 1rem", fontSize: "0.95rem" }}>
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}
