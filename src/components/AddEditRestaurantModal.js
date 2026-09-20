"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function AddEditRestaurantModal({ isOpen, onClose, onSave, restaurant = null }) {
  const [formData, setFormData] = useState({
    name: "",
    cuisine: "Italian",
    priceTier: "$$",
    deliveryTime: "25-35 min",
    rating: "4.5",
    image: "/images/pizza.png",
    banner: "/images/pizza.png",
    description: "",
    featured: true,
    categories: "Pizzas, Pastas, Salads, Drinks"
  });

  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name || "",
        cuisine: restaurant.cuisine || "Italian",
        priceTier: restaurant.priceTier || "$$",
        deliveryTime: restaurant.deliveryTime || "25-35 min",
        rating: restaurant.rating || "4.5",
        image: restaurant.image || "/images/pizza.png",
        banner: restaurant.banner || restaurant.image || "/images/pizza.png",
        description: restaurant.description || "",
        featured: restaurant.featured !== undefined ? restaurant.featured : true,
        categories: Array.isArray(restaurant.categories)
          ? restaurant.categories.join(", ")
          : restaurant.categories || "Pizzas, Pastas, Salads, Drinks"
      });
    } else {
      setFormData({
        name: "",
        cuisine: "Italian",
        priceTier: "$$",
        deliveryTime: "25-35 min",
        rating: "4.5",
        image: "/images/pizza.png",
        banner: "/images/pizza.png",
        description: "",
        featured: true,
        categories: "Pizzas, Pastas, Salads, Drinks"
      });
    }
  }, [restaurant, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    const categoriesArray = formData.categories
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    onSave({
      ...formData,
      rating: parseFloat(formData.rating) || 4.5,
      categories: categoriesArray.length > 0 ? categoriesArray : ["General"]
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: "600px" }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{restaurant ? "Edit Restaurant" : "Add New Restaurant"}</h3>
          <button onClick={onClose} className="action-icon-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Restaurant Name</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Royal Biryani & Karahi"
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Cuisine Type</label>
              <select
                className="form-input"
                value={formData.cuisine}
                onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
              >
                <option value="Italian">Italian</option>
                <option value="Burgers">Burgers</option>
                <option value="Japanese">Japanese</option>
                <option value="Mexican">Mexican</option>
                <option value="Pakistani">Pakistani</option>
                <option value="Chinese">Chinese</option>
                <option value="Desserts">Desserts</option>
                <option value="Fast Food">Fast Food</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Price Tier</label>
              <select
                className="form-input"
                value={formData.priceTier}
                onChange={(e) => setFormData({ ...formData, priceTier: e.target.value })}
              >
                <option value="$">$ (Budget)</option>
                <option value="$$">$$ (Moderate)</option>
                <option value="$$$">$$$ (Expensive)</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Estimated Delivery Time</label>
              <input
                type="text"
                className="form-input"
                value={formData.deliveryTime}
                onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                placeholder="20-30 min"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Rating (1.0 - 5.0)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                className="form-input"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                placeholder="4.5"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Short description of the restaurant..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Food Categories (Comma Separated)</label>
            <input
              type="text"
              className="form-input"
              value={formData.categories}
              onChange={(e) => setFormData({ ...formData, categories: e.target.value })}
              placeholder="Pizzas, Pastas, Salads, Drinks"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Card Image URL</label>
              <input
                type="text"
                className="form-input"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/images/pizza.png or image URL"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Banner Image URL</label>
              <input
                type="text"
                className="form-input"
                value={formData.banner}
                onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
                placeholder="/images/pizza.png or banner URL"
              />
            </div>
          </div>

          <div className="form-group" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="checkbox"
              id="featured-checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              style={{ width: "18px", height: "18px", accentColor: "var(--primary)" }}
            />
            <label htmlFor="featured-checkbox" style={{ fontWeight: 600, cursor: "pointer" }}>
              Show on Homepage as Featured Restaurant
            </label>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {restaurant ? "Save Changes" : "Add Restaurant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
