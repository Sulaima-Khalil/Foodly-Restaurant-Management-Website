export const MOCK_RESTAURANTS = [
  {
    id: "pizza-paradise",
    name: "Pizza Paradise",
    cuisine: "Italian",
    priceTier: "$$$",
    rating: 4.5,
    reviewCount: 120,
    deliveryTime: "30-45 min",
    image: "/images/pizza.png",
    banner: "/images/pizza.png",
    featured: true,
    categories: ["Pizzas", "Pastas", "Salads", "Drinks"],
    description: "Authentic wood-fired Italian pizzas crafted with sourdough and fresh ingredients."
  },
  {
    id: "burger-hub",
    name: "Burger Hub",
    cuisine: "Burgers",
    priceTier: "$$",
    rating: 4.3,
    reviewCount: 95,
    deliveryTime: "25-35 min",
    image: "/images/burger.png",
    banner: "/images/burger.png",
    featured: true,
    categories: ["Burgers", "Sides", "Drinks", "Combos"],
    description: "Juicy artisanal smash burgers cooked to perfection with house-made gourmet sauces."
  },
  {
    id: "sushi-world",
    name: "Sushi World",
    cuisine: "Japanese",
    priceTier: "$$$",
    rating: 4.8,
    reviewCount: 210,
    deliveryTime: "35-50 min",
    image: "/images/sushi.png",
    banner: "/images/sushi.png",
    featured: true,
    categories: ["Sushi Rolls", "Nigiri", "Sashimi", "Drinks"],
    description: "Premium grade sashimi and inventive sushi rolls prepared by master chefs."
  },
  {
    id: "taco-fiesta",
    name: "Taco Fiesta",
    cuisine: "Mexican",
    priceTier: "$$",
    rating: 4.2,
    reviewCount: 84,
    deliveryTime: "20-30 min",
    image: "/images/taco.png",
    banner: "/images/taco.png",
    featured: true,
    categories: ["Tacos", "Burritos", "Sides", "Drinks"],
    description: "Authentic Mexican street food packed with bold flavors and fresh salsa."
  },
  {
    id: "pasta-house",
    name: "Pasta House",
    cuisine: "Italian",
    priceTier: "$$",
    rating: 4.4,
    reviewCount: 110,
    deliveryTime: "25-40 min",
    image: "/images/pasta.png",
    banner: "/images/pasta.png",
    featured: false,
    categories: ["Pastas", "Salads", "Desserts", "Drinks"],
    description: "Handcrafted fresh pasta dishes tossed in rich house-made sauces."
  },
  {
    id: "sweet-bliss",
    name: "Sweet Bliss",
    cuisine: "Desserts",
    priceTier: "$$",
    rating: 4.7,
    reviewCount: 76,
    deliveryTime: "20-35 min",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80",
    featured: false,
    categories: ["Cakes", "Ice Cream", "Pastries", "Drinks"],
    description: "Decadent desserts, specialty cakes, and sweet treats for any craving."
  }
];

export const MOCK_MENU_ITEMS = [
  {
    id: "m1",
    restaurantId: "pizza-paradise",
    name: "Margherita Pizza",
    description: "Classic tomato sauce, mozzarella, fresh basil & olive oil",
    price: 8.99,
    category: "Pizzas",
    image: "/images/pizza.png",
    status: "Active"
  },
  {
    id: "m2",
    restaurantId: "pizza-paradise",
    name: "Pepperoni Pizza",
    description: "Crispy beef pepperoni, special tomato sauce, melted mozzarella",
    price: 10.99,
    category: "Pizzas",
    image: "/images/pizza.png",
    status: "Active"
  },
  {
    id: "m3",
    restaurantId: "pizza-paradise",
    name: "Veggie Pizza",
    description: "Fresh bell peppers, onions, olives, mushrooms, herbs & mozzarella",
    price: 8.99,
    category: "Pizzas",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80",
    status: "Active"
  },
  {
    id: "m4",
    restaurantId: "pizza-paradise",
    name: "BBQ Chicken Pizza",
    description: "Tender grilled chicken, tangy BBQ sauce, red onion, mozzarella",
    price: 11.99,
    category: "Pizzas",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=80",
    status: "Active"
  },
  {
    id: "m5",
    restaurantId: "pizza-paradise",
    name: "Cold Coffee",
    description: "Rich chilled espresso with cream, ice, and dark chocolate drizzle",
    price: 4.99,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&auto=format&fit=crop&q=80",
    status: "Active"
  },
  {
    id: "m6",
    restaurantId: "pizza-paradise",
    name: "French Fries",
    description: "Crispy golden potato fries seasoned with sea salt & herbs",
    price: 3.50,
    category: "Salads",
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=400&auto=format&fit=crop&q=80",
    status: "Active"
  },
  {
    id: "m7",
    restaurantId: "burger-hub",
    name: "Classic Cheeseburger",
    description: "Prime Angus beef patty, cheddar cheese, lettuce, tomato & house sauce",
    price: 9.49,
    category: "Burgers",
    image: "/images/burger.png",
    status: "Active"
  },
  {
    id: "m8",
    restaurantId: "burger-hub",
    name: "Double Bacon Burger",
    description: "Double beef patty, crispy bacon, smoked cheddar & BBQ mayo",
    price: 12.99,
    category: "Burgers",
    image: "/images/burger.png",
    status: "Active"
  },
  {
    id: "m9",
    restaurantId: "sushi-world",
    name: "Salmon Nigiri Set",
    description: "Fresh Atlantic salmon slices over seasoned sushi rice (6 pcs)",
    price: 14.50,
    category: "Nigiri",
    image: "/images/sushi.png",
    status: "Active"
  },
  {
    id: "m10",
    restaurantId: "taco-fiesta",
    name: "Beef Street Tacos",
    description: "Three soft corn tortillas with marinated beef, cilantro & salsa",
    price: 8.50,
    category: "Tacos",
    image: "/images/taco.png",
    status: "Active"
  },
  {
    id: "m11",
    restaurantId: "pasta-house",
    name: "Creamy Alfredo Pasta",
    description: "Fettuccine pasta in creamy parmesan sauce with garlic bread",
    price: 11.50,
    category: "Pastas",
    image: "/images/pasta.png",
    status: "Active"
  }
];

export const MOCK_ORDERS = [
  {
    id: "FD123456",
    customer: "Sulaima Khalil",
    customerEmail: "sulaima@email.com",
    phone: "+92 300 1234567",
    address: "House 12, Qasim Pur Colony, Multan",
    restaurantName: "Pizza Paradise",
    items: [
      { id: "m1", name: "Margherita Pizza", price: 8.99, quantity: 1, image: "/images/pizza.png" },
      { id: "m5", name: "Cold Coffee", price: 4.99, quantity: 1, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&auto=format&fit=crop&q=80" },
      { id: "m6", name: "French Fries", price: 3.50, quantity: 1, image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=400&auto=format&fit=crop&q=80" }
    ],
    subtotal: 17.48,
    deliveryFee: 2.00,
    total: 19.48,
    paymentMethod: "Cash on Delivery",
    status: "Delivered",
    date: "May 10, 2025"
  },
  {
    id: "FD123455",
    customer: "Ali Raza",
    customerEmail: "ali.raza@email.com",
    phone: "+92 301 9876543",
    address: "Street 4, Gulberg, Lahore",
    restaurantName: "Burger Hub",
    items: [
      { id: "m7", name: "Classic Cheeseburger", price: 9.49, quantity: 1, image: "/images/burger.png" },
      { id: "m6", name: "French Fries", price: 3.50, quantity: 1, image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=400&auto=format&fit=crop&q=80" }
    ],
    subtotal: 12.99,
    deliveryFee: 2.00,
    total: 14.99,
    paymentMethod: "Online Payment",
    status: "Preparing",
    date: "May 8, 2025"
  },
  {
    id: "FD123454",
    customer: "Sana Ahmed",
    customerEmail: "sana.ahmed@email.com",
    phone: "+92 302 5551234",
    address: "Block B, F-7, Islamabad",
    restaurantName: "Sushi World",
    items: [
      { id: "m9", name: "Salmon Nigiri Set", price: 14.50, quantity: 1, image: "/images/sushi.png" }
    ],
    subtotal: 20.50,
    deliveryFee: 2.00,
    total: 22.50,
    paymentMethod: "Cash on Delivery",
    status: "Delivered",
    date: "May 5, 2025"
  },
  {
    id: "FD123453",
    customer: "Bilal Khan",
    customerEmail: "bilal.k@email.com",
    phone: "+92 303 7778899",
    address: "Phase 5, DHA, Karachi",
    restaurantName: "Taco Fiesta",
    items: [
      { id: "m10", name: "Beef Street Tacos", price: 8.50, quantity: 1, image: "/images/taco.png" }
    ],
    subtotal: 9.20,
    deliveryFee: 2.00,
    total: 11.20,
    paymentMethod: "Cash on Delivery",
    status: "Cancelled",
    date: "May 3, 2025"
  }
];

export const MOCK_USER = {
  name: "Sulaima Khalil",
  email: "sulaima@email.com",
  phone: "+92 300 1234567",
  address: "House 12, Qasim Pur Colony, Multan",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  role: "user" // 'user' | 'admin'
};
