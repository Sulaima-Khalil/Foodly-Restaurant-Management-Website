"use client";

import React, { use } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

export default function OrderConfirmationPage({ params }) {
  const { id } = use(params);

  return (
    <div className="container">
      {/* Screen 6: Order Confirmation */}
      <div className="confirmation-container">
        <div className="success-badge-wrapper">
          <Check size={42} strokeWidth={3} />
        </div>

        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.8rem" }}>
          Order Placed Successfully!
        </h1>

        <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginBottom: "2rem", maxWidth: "400px", margin: "0 auto 2rem" }}>
          Your order <strong className="order-code-highlight">#{id}</strong> has been placed. <br />
          You&apos;ll receive a confirmation soon.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", maxWidth: "260px", margin: "0 auto" }}>
          <Link href="/dashboard" className="btn-primary btn-full">
            Track Order
          </Link>
          <Link href="/" className="btn-secondary btn-full">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
