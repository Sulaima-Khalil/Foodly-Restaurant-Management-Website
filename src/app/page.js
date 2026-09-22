"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Zap, Award, ShieldCheck, ArrowRight } from "lucide-react";
import { useOrders } from "@/context/OrderContext";
import RestaurantCard from "@/components/RestaurantCard";

export default function HomePage() {
  const router = useRouter();
  const { restaurants } = useOrders();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/restaurants?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/restaurants");
    }
  };

  const popularRestaurants = restaurants.filter((r) => r.featured).slice(0, 4);

  return (
    <div>
      {/* Screen 1: Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <span className="hero-tag">Good Food, Good Mood</span>
            <h1 className="hero-title">
              Order Your <br />
              <span style={{ color: "var(--primary)" }}>Favorite Food</span>
            </h1>
            <p className="hero-subtitle">
              Discover amazing restaurants, delicious meals, and get your food delivered right to your door in minutes.
            </p>

            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="hero-search-box">
              <input
                type="text"
                placeholder="Search for food, restaurants, or cuisines..."
                className="hero-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="hero-search-btn" aria-label="Search">
                <Search size={18} />
              </button>
            </form>

            {/* Value Props Badges */}
            <div className="hero-badges">
              <div className="hero-badge-item">
                <span className="hero-badge-icon">
                  <Zap size={13} />
                </span>
                Fast Delivery
              </div>
              <div className="hero-badge-item">
                <span className="hero-badge-icon">
                  <Award size={13} />
                </span>
                Fresh & Tasty
              </div>
              <div className="hero-badge-item">
                <span className="hero-badge-icon">
                  <ShieldCheck size={13} />
                </span>
                Secure Payment
              </div>
            </div>
          </div>

          {/* Hero Banner Image */}
          <div className="hero-image-wrapper">
            <img
              src="/images/hero_food.png"
              alt="Gourmet Delicious Food Platter"
              className="hero-img"
            />
          </div>
        </div>
      </section>

      {/* Popular Restaurants Section */}
      <section style={{ padding: "2rem 0 4rem" }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Popular Restaurants</h2>
            <Link href="/restaurants" className="view-all-link">
              View More <ArrowRight size={16} />
            </Link>
          </div>

          <div className="restaurants-grid home-restaurants-grid">
            {popularRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
