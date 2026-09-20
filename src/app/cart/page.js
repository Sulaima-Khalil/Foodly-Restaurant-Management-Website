"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, subtotal, deliveryFee, total, itemCount } = useCart();

  return (
    <div className="container" style={{ paddingTop: "2rem" }}>
      <h1 className="section-title">Your Cart ({itemCount})</h1>

      {cartItems.length > 0 ? (
        <div className="cart-layout">
          {/* Cart Items Table List (Screen 4) */}
          <div className="cart-items-card">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-table-row">
                <div className="cart-item-details">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div>
                    <h4 className="cart-item-name">{item.name}</h4>
                    <span className="cart-item-price">${item.price.toFixed(2)}</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  {/* Quantity Control (- 1 +) */}
                  <div className="quantity-control">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="qty-btn"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="qty-val">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="qty-btn"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Remove Item */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{ color: "var(--text-light)", transition: "color 0.2s ease" }}
                    title="Remove item"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid var(--border-light)" }}>
              <Link href="/restaurants" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 600 }}>
                <ArrowLeft size={16} /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar (Screen 4) */}
          <div className="order-summary-card">
            <h3 className="summary-title">Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong style={{ color: "var(--text-main)" }}>${subtotal.toFixed(2)}</strong>
            </div>

            <div className="summary-row">
              <span>Delivery Fee</span>
              <strong style={{ color: "var(--text-main)" }}>${deliveryFee.toFixed(2)}</strong>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="btn-primary btn-full"
              style={{ marginTop: "1.5rem" }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        /* Empty Cart State */
        <div style={{ background: "white", padding: "4rem 2rem", borderRadius: "16px", textAlign: "center", border: "1px solid var(--border-color)", margin: "2rem 0" }}>
          <div style={{ width: "64px", height: "64px", background: "var(--primary-light)", color: "var(--primary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
            <ShoppingBag size={28} />
          </div>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.5rem" }}>Your Cart is Empty</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Looks like you haven't added any delicious food items to your cart yet.
          </p>
          <Link href="/restaurants" className="btn-primary">
            Explore Menu & Restaurants
          </Link>
        </div>
      )}
    </div>
  );
}
