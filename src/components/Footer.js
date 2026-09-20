import React from "react";
import Link from "next/link";
import { Utensils, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "white", borderTop: "1px solid var(--border-color)", padding: "3rem 0 1.5rem" }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1.5fr repeat(3, 1fr)", gap: "2rem", marginBottom: "2rem" }}>
        <div>
          <Link href="/" className="brand-logo" style={{ marginBottom: "1rem" }}>
            <span className="brand-icon">
              <Utensils size={18} />
            </span>
            Foodly
          </Link>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", maxWidth: "300px", marginTop: "0.8rem" }}>
            Good Food, Good Mood. Discover amazing restaurants, delicious meals, and get your food delivered hot to your door.
          </p>
        </div>

        <div>
          <h4 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "1rem" }}>Quick Links</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/restaurants">All Restaurants</Link></li>
            <li><Link href="/cart">Your Cart</Link></li>
            <li><Link href="/dashboard">User Account</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "1rem" }}>Cuisines</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            <li><Link href="/restaurants?cuisine=Italian">Italian Cuisine</Link></li>
            <li><Link href="/restaurants?cuisine=Burgers">Gourmet Burgers</Link></li>
            <li><Link href="/restaurants?cuisine=Japanese">Japanese Sushi</Link></li>
            <li><Link href="/restaurants?cuisine=Mexican">Mexican Tacos</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "1rem" }}>Admin Portal</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            <li><Link href="/admin">Admin Dashboard</Link></li>
            <li><Link href="/admin/menu">Menu Management</Link></li>
            <li><Link href="/login">Login / Sign Up</Link></li>
          </ul>
        </div>
      </div>

      <div className="container" style={{ borderTop: "1px solid var(--border-light)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", color: "var(--text-light)" }}>
        <p>© {new Date().getFullYear()} Foodly Inc. All rights reserved.</p>
        <p style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          Built with Next.js, HTML, CSS & JS
        </p>
      </div>
    </footer>
  );
}
