"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <div className="container" style={{ paddingTop: "2.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <span className="hero-tag">Contact Us</span>
        <h1 style={{ fontSize: "2.6rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "0.5rem" }}>
          We&apos;d Love to <span style={{ color: "var(--primary)" }}>Hear From You</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
          Have a question, feedback, or need help with an order? Reach out to our team.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "2.5rem", marginBottom: "4rem" }}>
        {/* Contact Information Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <div style={{ background: "white", padding: "1.5rem", borderRadius: "14px", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", gap: "1.2rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Phone size={22} />
            </div>
            <div>
              <strong style={{ display: "block", fontSize: "0.95rem" }}>Phone Number</strong>
              <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>+92 300 1234567</span>
            </div>
          </div>

          <div style={{ background: "white", padding: "1.5rem", borderRadius: "14px", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", gap: "1.2rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Mail size={22} />
            </div>
            <div>
              <strong style={{ display: "block", fontSize: "0.95rem" }}>Email Support</strong>
              <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>support@foodly.com</span>
            </div>
          </div>

          <div style={{ background: "white", padding: "1.5rem", borderRadius: "14px", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", gap: "1.2rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MapPin size={22} />
            </div>
            <div>
              <strong style={{ display: "block", fontSize: "0.95rem" }}>Head Office</strong>
              <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Foodly HQ, Multan, Pakistan</span>
            </div>
          </div>

          <div style={{ background: "white", padding: "1.5rem", borderRadius: "14px", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", gap: "1.2rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Clock size={22} />
            </div>
            <div>
              <strong style={{ display: "block", fontSize: "0.95rem" }}>Support Hours</strong>
              <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>24/7 Customer Care</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div style={{ background: "white", padding: "2.2rem", borderRadius: "16px", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1.5rem" }}>Send Us a Message</h3>

          {submitted && (
            <div style={{ background: "#ecfdf5", color: "#065f46", border: "1px solid #a7f3d0", padding: "1rem", borderRadius: "10px", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <CheckCircle2 size={20} color="#059669" />
              <span>Thank you! Your message has been sent successfully. We will reply shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Sulaima Khalil"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                type="text"
                className="form-input"
                placeholder="Order Inquiry / Feedback"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-input"
                rows={4}
                placeholder="How can we help you?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ padding: "0.8rem 1.8rem", marginTop: "0.5rem" }}>
              <Send size={16} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
