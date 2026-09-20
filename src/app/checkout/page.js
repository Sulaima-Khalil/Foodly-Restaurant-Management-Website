"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { cartItems, subtotal, deliveryFee, total, clearCart } = useCart();
  const { placeOrder } = useOrders();

  const [formData, setFormData] = useState({
    fullName: user?.name || "Sulaima Khalil",
    phone: user?.phone || "+92 300 1234567",
    address: user?.address || "House 12, Qasim Pur Colony, Multan",
    paymentMethod: "Cash on Delivery"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsSubmitting(true);

    const orderData = {
      customer: formData.fullName,
      customerEmail: user?.email || "sulaima@email.com",
      phone: formData.phone,
      address: formData.address,
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      paymentMethod: formData.paymentMethod,
      restaurantName: "Pizza Paradise"
    };

    setTimeout(() => {
      const newOrder = placeOrder(orderData);
      clearCart();
      setIsSubmitting(false);
      router.push(`/order-confirmation/${newOrder.id}`);
    }, 600);
  };

  return (
    <div className="container" style={{ paddingTop: "2rem" }}>
      <h1 className="section-title" style={{ marginBottom: "1.5rem" }}>Checkout</h1>

      <div className="checkout-layout">
        {/* Delivery Form (Screen 5) */}
        <form onSubmit={handlePlaceOrder}>
          <div className="form-card">
            <h3 className="form-section-title">Delivery Information</h3>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-input"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-input"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Delivery Address</label>
              <textarea
                name="address"
                className="form-input"
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-card">
            <h3 className="form-section-title">Payment Method</h3>

            <div className="radio-list" style={{ gap: "1rem" }}>
              <label className="radio-item" style={{ padding: "0.8rem 1rem", border: "1px solid var(--border-color)", borderRadius: "8px", background: formData.paymentMethod === "Cash on Delivery" ? "var(--primary-light)" : "white" }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  checked={formData.paymentMethod === "Cash on Delivery"}
                  onChange={handleInputChange}
                />
                <span style={{ fontWeight: 600 }}>Cash on Delivery</span>
              </label>

              <label className="radio-item" style={{ padding: "0.8rem 1rem", border: "1px solid var(--border-color)", borderRadius: "8px", background: formData.paymentMethod === "Online Payment" ? "var(--primary-light)" : "white" }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Online Payment"
                  checked={formData.paymentMethod === "Online Payment"}
                  onChange={handleInputChange}
                />
                <span style={{ fontWeight: 600 }}>Online Payment (Credit / Debit Card)</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary btn-full"
            disabled={isSubmitting || cartItems.length === 0}
            style={{ padding: "0.9rem" }}
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        {/* Order Summary Sidebar (Screen 5) */}
        <aside className="order-summary-card">
          <h3 className="summary-title">Order Summary</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "1.2rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border-light)" }}>
            {cartItems.map((item) => (
              <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  <img src={item.image} alt={item.name} style={{ width: "36px", height: "36px", borderRadius: "6px", objectFit: "cover" }} />
                  <div>
                    <strong style={{ fontSize: "0.85rem", display: "block" }}>{item.name}</strong>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Qty: {item.quantity}</span>
                  </div>
                </div>
                <span style={{ fontSize: "0.88rem", fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <strong>${deliveryFee.toFixed(2)}</strong>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
