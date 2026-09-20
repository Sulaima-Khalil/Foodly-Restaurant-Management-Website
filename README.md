# 🍕 Foodly - Complete Online Food Ordering Web Application

**Foodly** is a full-featured, modern Online Food Ordering System built with **Next.js (App Router)**, **JavaScript/TypeScript**, **Vanilla CSS**, **React Context API**, and **REST API Route Handlers**.

Designed from the 10 screen UI specification, Foodly provides a seamless experience for both customers ordering food and admins managing restaurant menus and tracking incoming orders.

---

## 🌟 Key Features

### 👤 Customer Features
- **Hero Landing Page**: Fast food discovery with hero search bar, popular restaurant recommendations, and value prop badges.
- **Searchable Menu & Filter**: Search restaurants by name, filter by cuisines (*Italian, Burgers, Japanese, Mexican, Chinese, Desserts*), and sort by *Recommended, Newest First, or Highest Rated*.
- **Restaurant Menu Page**: View detailed restaurant information, filter menu items by categories (*Pizzas, Pastas, Salads, Drinks*), and add items to cart in real-time.
- **Real-Time Cart System**: Live quantity controls (`- 1 +`), item removal, subtotal calculation, and dynamic total price updates.
- **Checkout & Form Validation**: Address & contact information inputs, Cash on Delivery / Online Payment selection, and instant order placement.
- **Order Confirmation & Tracking**: Success checkmark animation, unique order ID generation (`#FD123456`), and order status tracking.
- **User Dashboard**: Profile view, addresses, payment methods, and historical order details with live status badges (*Delivered*, *Preparing*, *Out for Delivery*, *Cancelled*).
- **Authentication**: Tabbed Login and Sign Up with client validation, password visibility toggle, and instant **Demo Customer** login shortcut.

### 🛡️ Admin Features
- **Admin Dashboard**: Real-time KPI summary cards (*Total Orders*, *Total Revenue*, *Active Users*).
- **Live Order Management**: Recent orders table with real-time order status updater dropdowns.
- **Menu Management (CRUD)**: Menu items table with **+ Add Item** modal, **Edit Item** modal, and instant **Delete** capabilities connected to REST API routes.
- **Role Switcher**: Quick role toggle badge in navbar for seamless evaluation between Customer and Admin modes.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Library**: React 19
- **Styling**: Vanilla Custom CSS Design System (`globals.css`) with curated color tokens, glassmorphism card elevation, and responsive flex/grid layouts
- **State Management**: React Context API (`AuthContext`, `CartContext`, `OrderContext`) with `localStorage` persistence
- **Backend / REST APIs**: Next.js Route Handlers (`/api/...`)
- **Iconography**: Lucide React Icons

---

## 📁 Project Structure

```
Online_Food_ordering_website/
├── public/
│   ├── images/                # High-res food photos & background assets
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.js          # Root layout with Context Providers, Header, & Footer
│   │   ├── page.js            # Page 1: Home Landing Page
│   │   ├── globals.css        # Core Design Tokens & Component CSS
│   │   ├── restaurants/
│   │   │   └── page.js        # Page 2: Restaurants & Menu Search
│   │   ├── restaurant/
│   │   │   └── [id]/page.js   # Page 3: Restaurant Menu Details
│   │   ├── cart/
│   │   │   └── page.js        # Page 4: Cart Management
│   │   ├── checkout/
│   │   │   └── page.js        # Page 5: Checkout Form
│   │   ├── order-confirmation/
│   │   │   └── [id]/page.js   # Page 6: Order Confirmation
│   │   ├── login/
│   │   │   └── page.js        # Page 7: Login & Sign Up
│   │   ├── dashboard/
│   │   │   └── page.js        # Page 8: User Dashboard & Orders
│   │   ├── admin/
│   │   │   ├── page.js        # Page 9: Admin Dashboard & Order Tracker
│   │   │   └── menu/page.js   # Page 10: Admin Menu Management
│   │   └── api/
│   │       ├── restaurants/route.js # REST API: Get filtered restaurants
│   │       ├── menu/route.js        # REST API: Get & Post menu items
│   │       ├── menu/[id]/route.js   # REST API: Put & Delete menu item
│   │       ├── orders/route.js      # REST API: Get & Post orders
│   │       └── auth/route.js        # REST API: Login & Signup handler
│   ├── components/
│   │   ├── Header.js          # Sticky Navigation Bar with role switch
│   │   ├── Footer.js          # Page Footer with Quick Links & Logout
│   │   ├── RestaurantCard.js  # Reusable Restaurant Card
│   │   └── AddEditItemModal.js# Admin Modal for Adding/Editing Menu Items
│   ├── context/
│   │   ├── AuthContext.js     # User authentication & role state
│   │   ├── CartContext.js     # Cart state & price calculations
│   │   └── OrderContext.js    # Orders & Menu items CRUD state
│   └── data/
│       └── mockData.js        # Initial database of restaurants, menu, and orders
├── package.json
└── README.md
```

---

## 🌐 REST API Documentation

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/restaurants` | `GET` | Returns list of restaurants with optional `?cuisine=` and `?search=` query filters |
| `/api/menu` | `GET` | Returns menu items filtered by `?restaurantId=` or `?category=` |
| `/api/menu` | `POST` | Creates a new food menu item |
| `/api/menu/[id]` | `PUT` | Updates existing menu item by ID |
| `/api/menu/[id]` | `DELETE` | Deletes a menu item by ID |
| `/api/orders` | `GET` | Fetches all orders |
| `/api/orders` | `POST` | Creates and places a new order |
| `/api/auth` | `POST` | Handles login and user registration |

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v18.0.0 or higher) installed on your machine.

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/Sulaima-Khalil/Online_Food_ordering_website.git
cd Online_Food_ordering_website
npm install
```

### 3. Run Development Server
Start the Next.js local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### 4. Build for Production
To build the application for production:

```bash
npm run build
npm start
```

---

## 🔑 Demo Access Credentials

For quick evaluation, you can use the built-in quick login buttons on the **Login Page** (`/login`) or click the **Role** badge in the navbar:

- **Customer Role**:
  - Email: `sulaima@email.com`
  - Access: Browse restaurants, add to cart, checkout, view order history.
- **Admin Role**:
  - Email: `admin@foodly.com`
  - Access: View revenue stats, update live order statuses, add/edit/delete menu items.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
