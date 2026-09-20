import React from "react";
import Link from "next/link";
import { Utensils, Award, Zap, ShieldCheck, Heart, Users } from "lucide-react";

export const metadata = {
  title: "About Us | Foodly",
  description: "Learn about Foodly's mission to deliver fresh, delicious food from top local restaurants directly to your door."
};

export default function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: "2.5rem" }}>
      {/* Hero Banner Section */}
      <div style={{ background: "white", borderRadius: "20px", border: "1px solid var(--border-color)", padding: "3.5rem 2rem", textAlign: "center", marginBottom: "3rem", boxShadow: "var(--shadow-sm)" }}>
        <span className="hero-tag">About Foodly</span>
        <h1 style={{ fontSize: "2.8rem", fontWeight: 800, marginBottom: "1rem", color: "var(--text-main)", letterSpacing: "-0.5px" }}>
          Good Food, <span style={{ color: "var(--primary)" }}>Good Mood</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "680px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
          Foodly was founded with a simple goal: connecting food lovers with the best local chefs and restaurants in town, delivering piping hot, delicious meals fast and hassle-free.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}>
          <Link href="/restaurants" className="btn-primary">
            Explore Restaurants
          </Link>
          <Link href="/contact" className="btn-secondary">
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Values & Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.8rem", marginBottom: "3.5rem" }}>
        <div style={{ background: "white", padding: "2rem", borderRadius: "16px", border: "1px solid var(--border-color)", textAlign: "center" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.2rem" }}>
            <Zap size={26} />
          </div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Lightning Fast Delivery</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Our dedicated riders ensure your food arrives hot and fresh within 30 minutes.
          </p>
        </div>

        <div style={{ background: "white", padding: "2rem", borderRadius: "16px", border: "1px solid var(--border-color)", textAlign: "center" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.2rem" }}>
            <Award size={26} />
          </div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Top Rated Restaurants</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            We carefully select and audit partner kitchens for top hygienic and taste standards.
          </p>
        </div>

        <div style={{ background: "white", padding: "2rem", borderRadius: "16px", border: "1px solid var(--border-color)", textAlign: "center" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.2rem" }}>
            <ShieldCheck size={26} />
          </div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>100% Satisfaction</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Dedicated 24/7 customer support ensuring every meal exceeds your expectations.
          </p>
        </div>
      </div>
    </div>
  );
}
