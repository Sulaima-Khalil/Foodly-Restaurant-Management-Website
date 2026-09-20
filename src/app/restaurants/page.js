"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useOrders } from "@/context/OrderContext";
import RestaurantCard from "@/components/RestaurantCard";

function RestaurantsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialCuisine = searchParams.get("cuisine") || "All";

  const { restaurants } = useOrders();

  const [search, setSearch] = useState(initialSearch);
  const [selectedCuisine, setSelectedCuisine] = useState(initialCuisine);
  const [sortBy, setSortBy] = useState("Recommended");

  const cuisinesList = ["All", "Italian", "Burgers", "Japanese", "Mexican", "Chinese", "Desserts"];

  // Filter & Sort Logic
  const filteredRestaurants = useMemo(() => {
    return restaurants
      .filter((r) => {
        const matchesCuisine =
          selectedCuisine === "All" ||
          r.cuisine.toLowerCase() === selectedCuisine.toLowerCase();
        const matchesSearch =
          !search ||
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.cuisine.toLowerCase().includes(search.toLowerCase());
        return matchesCuisine && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "Highest Rated") return b.rating - a.rating;
        if (sortBy === "Newest First") return b.id.localeCompare(a.id);
        return 0; // Recommended default order
      });
  }, [restaurants, selectedCuisine, search, sortBy]);

  return (
    <div className="page-sidebar-layout">
      {/* Left Sidebar Filter (Screen 2) */}
      <aside className="filter-sidebar">
        {/* Search Box */}
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search restaurants..."
            className="search-input-field"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Cuisines Checkboxes */}
        <div className="filter-group">
          <h4 className="filter-title">Cuisines</h4>
          <ul className="checkbox-list">
            {cuisinesList.map((cuisine) => (
              <li key={cuisine}>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={selectedCuisine === cuisine}
                    onChange={() => setSelectedCuisine(cuisine)}
                  />
                  <span>{cuisine}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Sort By Radio Buttons */}
        <div className="filter-group">
          <h4 className="filter-title">Sort By</h4>
          <ul className="radio-list">
            {["Recommended", "Newest First", "Highest Rated"].map((option) => (
              <li key={option}>
                <label className="radio-item">
                  <input
                    type="radio"
                    name="sortBy"
                    checked={sortBy === option}
                    onChange={() => setSortBy(option)}
                  />
                  <span>{option}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content Area */}
      <main>
        <div className="section-header" style={{ marginBottom: "1.5rem" }}>
          <div>
            <h1 className="section-title">All Restaurants</h1>
            <span style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
              {filteredRestaurants.length} restaurants found
            </span>
          </div>
        </div>

        {filteredRestaurants.length > 0 ? (
          <div className="restaurants-grid">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div style={{ background: "white", padding: "3rem", borderRadius: "12px", textAlign: "center", color: "var(--text-muted)" }}>
            <h3>No restaurants found</h3>
            <p style={{ marginTop: "0.5rem" }}>Try adjusting your filters or search terms.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function RestaurantsPage() {
  return (
    <div className="container">
      <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center" }}>Loading restaurants...</div>}>
        <RestaurantsContent />
      </Suspense>
    </div>
  );
}
