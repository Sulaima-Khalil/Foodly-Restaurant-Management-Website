"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function AddEditItemModal({ isOpen, onClose, onSave, item = null }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Pizzas",
    price: "",
    description: "",
    image: "/images/pizza.png",
    restaurantId: "pizza-paradise"
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        category: item.category || "Pizzas",
        price: item.price || "",
        description: item.description || "",
        image: item.image || "/images/pizza.png",
        restaurantId: item.restaurantId || "pizza-paradise"
      });
    } else {
      setFormData({
        name: "",
        category: "Pizzas",
        price: "",
        description: "",
        image: "/images/pizza.png",
        restaurantId: "pizza-paradise"
      });
    }
  }, [item, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    onSave({
      ...formData,
      price: parseFloat(formData.price)
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{item ? "Edit Menu Item" : "Add New Menu Item"}</h3>
          <button onClick={onClose} className="action-icon-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Item Name</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Margherita Pizza"
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-input"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Pizzas">Pizzas</option>
                <option value="Burgers">Burgers</option>
                <option value="Pastas">Pastas</option>
                <option value="Salads">Salads</option>
                <option value="Drinks">Drinks</option>
                <option value="Desserts">Desserts</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Price ($)</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="8.99"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description / Ingredients</label>
            <textarea
              className="form-input"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g. Classic tomato sauce, mozzarella, fresh basil"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              className="form-input"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="/images/pizza.png or image URL"
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {item ? "Save Changes" : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
