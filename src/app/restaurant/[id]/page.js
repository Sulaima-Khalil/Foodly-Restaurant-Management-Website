"use client";

import React, { useState, use } from "react";
import { Star, Clock, Plus, Check } from "lucide-react";
import { useOrders } from "@/context/OrderContext";
import { useCart } from "@/context/CartContext";

export default function RestaurantDetailPage({ params }) {
  const { id } = use(params);
  const { restaurants, menuItems } = useOrders();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState("Menu");
  const [activeCategory, setActiveCategory] = useState("Pizzas");
  const [addedItemIds, setAddedItemIds] = useState({});

  const restaurant = restaurants.find((r) => r.id === id) || restaurants[0];
  const restaurantMenuItems = menuItems.filter(
    (item) => item.restaurantId === restaurant.id || item.restaurantId === "pizza-paradise"
  );

  const categories = restaurant.categories || ["Pizzas", "Pastas", "Salads", "Drinks"];

  const filteredItems = restaurantMenuItems.filter((item) => {
    if (!activeCategory || activeCategory === "All") return true;
    return item.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  return (
    <div className="container restaurant-detail-page" style={{ paddingTop: "2rem" }}>
      {/* Restaurant Header Banner Card (Screen 3) */}
      <div className="menu-details-header">
        <img
          src={restaurant.banner || restaurant.image}
          alt={restaurant.name}
          className="menu-banner-img"
        />

        <div className="menu-header-body">
          <div className="restaurant-header-content">
            <h1 className="restaurant-detail-title">{restaurant.name}</h1>
            <p className="restaurant-detail-sub">
              {restaurant.cuisine} • {restaurant.priceTier}
            </p>
            <div className="restaurant-stats">
              <div className="rating-badge">
                <Star size={13} fill="currentColor" />
                <span>{restaurant.rating}</span>
                <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                  ({restaurant.reviewCount} reviews)
                </span>
              </div>
              <div className="delivery-info">
                <Clock size={14} />
                <span>{restaurant.deliveryTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Nav: Menu | About */}
      <div className="menu-nav-tabs">
        <button
          className={`tab-btn ${activeTab === "Menu" ? "active" : ""}`}
          onClick={() => setActiveTab("Menu")}
        >
          Menu
        </button>
        <button
          className={`tab-btn ${activeTab === "About" ? "active" : ""}`}
          onClick={() => setActiveTab("About")}
        >
          About
        </button>
      </div>

      {activeTab === "Menu" ? (
        <div className="restaurant-menu-layout">
          {/* Left Category Navigation Sidebar */}
          <aside className="category-nav-sidebar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`cat-nav-item ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </aside>

          {/* Menu Items List Area */}
          <main className="restaurant-menu-content">
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>
              {activeCategory}
            </h3>

            <div className="menu-items-list">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div key={item.id} className="menu-item-row">
                    <div className="menu-item-left">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="menu-item-thumb"
                      />
                      <div className="menu-item-info">
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                      </div>
                    </div>

                    <div className="menu-item-right">
                      <span className="item-price-tag">${item.price.toFixed(2)}</span>
                      <button
                        className="add-cart-btn"
                        onClick={() => handleAddToCart(item)}
                        aria-label={`Add ${item.name} to cart`}
                        title="Add to cart"
                      >
                        {addedItemIds[item.id] ? <Check size={18} /> : <Plus size={18} />}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ background: "white", padding: "2rem", borderRadius: "12px", textAlign: "center", color: "var(--text-muted)" }}>
                  No items in this category yet.
                </div>
              )}
            </div>
          </main>
        </div>
      ) : (
        /* About Tab Content */
        <div className="restaurant-about-card">
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.8rem" }}>
            About {restaurant.name}
          </h3>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            {restaurant.description}
          </p>
          <div className="restaurant-about-stats" style={{ borderTop: "1px solid var(--border-light)", paddingTop: "1rem" }}>
            <div>
              <strong style={{ display: "block", fontSize: "0.85rem", color: "var(--text-muted)" }}>CUISINE</strong>
              <span>{restaurant.cuisine}</span>
            </div>
            <div>
              <strong style={{ display: "block", fontSize: "0.85rem", color: "var(--text-muted)" }}>RATING</strong>
              <span>★ {restaurant.rating} / 5.0</span>
            </div>
            <div>
              <strong style={{ display: "block", fontSize: "0.85rem", color: "var(--text-muted)" }}>ESTIMATED DELIVERY</strong>
              <span>{restaurant.deliveryTime}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
