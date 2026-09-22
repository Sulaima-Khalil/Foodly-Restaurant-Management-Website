"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MOCK_ORDERS, MOCK_MENU_ITEMS, MOCK_RESTAURANTS } from "@/data/mockData";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from localStorage or mock data
    const savedOrders = localStorage.getItem("foodly_orders");
    const savedMenuItems = localStorage.getItem("foodly_menu_items");
    const savedRestaurants = localStorage.getItem("foodly_restaurants");

    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        setOrders(Array.isArray(parsedOrders) && parsedOrders.length > 0 ? parsedOrders : MOCK_ORDERS);
      } catch (e) {
        setOrders(MOCK_ORDERS);
      }
    } else {
      setOrders(MOCK_ORDERS);
      localStorage.setItem("foodly_orders", JSON.stringify(MOCK_ORDERS));
    }

    if (savedMenuItems) {
      try {
        const parsedMenuItems = JSON.parse(savedMenuItems);
        setMenuItems(Array.isArray(parsedMenuItems) && parsedMenuItems.length > 0 ? parsedMenuItems : MOCK_MENU_ITEMS);
      } catch (e) {
        setMenuItems(MOCK_MENU_ITEMS);
      }
    } else {
      setMenuItems(MOCK_MENU_ITEMS);
      localStorage.setItem("foodly_menu_items", JSON.stringify(MOCK_MENU_ITEMS));
    }

    if (savedRestaurants) {
      try {
        const parsedRestaurants = JSON.parse(savedRestaurants);
        setRestaurants(Array.isArray(parsedRestaurants) && parsedRestaurants.length > 0 ? parsedRestaurants : MOCK_RESTAURANTS);
      } catch (e) {
        setRestaurants(MOCK_RESTAURANTS);
      }
    } else {
      setRestaurants(MOCK_RESTAURANTS);
      localStorage.setItem("foodly_restaurants", JSON.stringify(MOCK_RESTAURANTS));
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("foodly_orders", JSON.stringify(orders));
    }
  }, [orders, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("foodly_menu_items", JSON.stringify(menuItems));
    }
  }, [menuItems, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("foodly_restaurants", JSON.stringify(restaurants));
    }
  }, [restaurants, isLoaded]);

  // Order Operations
  const placeOrder = (orderData) => {
    const newOrder = {
      id: `FD${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Preparing",
      ...orderData
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Menu Item Operations (Admin CRUD)
  const addMenuItem = (item) => {
    const newItem = {
      id: `m${Date.now()}`,
      status: "Active",
      ...item
    };
    setMenuItems((prev) => [newItem, ...prev]);
    return newItem;
  };

  const updateMenuItem = (id, updatedFields) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteMenuItem = (id) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Restaurant Operations (Admin CRUD)
  const addRestaurant = (restaurantData) => {
    const newRestaurant = {
      id: restaurantData.name ? restaurantData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString().slice(-4) : `r-${Date.now()}`,
      rating: parseFloat(restaurantData.rating) || 4.5,
      reviewCount: parseInt(restaurantData.reviewCount) || 1,
      featured: Boolean(restaurantData.featured),
      categories: Array.isArray(restaurantData.categories)
        ? restaurantData.categories
        : (restaurantData.categories || "Pizzas, Pastas, Drinks").split(",").map((c) => c.trim()),
      ...restaurantData
    };
    setRestaurants((prev) => [newRestaurant, ...prev]);
    return newRestaurant;
  };

  const updateRestaurant = (id, updatedFields) => {
    setRestaurants((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updatedFields } : r))
    );
  };

  const deleteRestaurant = (id) => {
    setRestaurants((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        menuItems,
        restaurants,
        placeOrder,
        updateOrderStatus,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        addRestaurant,
        updateRestaurant,
        deleteRestaurant
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
