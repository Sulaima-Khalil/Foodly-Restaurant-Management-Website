# Foodly

Foodly is a complete online food ordering website built with Next.js 16, React 19, and local state management. It includes a customer flow for browsing restaurants, adding items to the cart, placing orders, and managing a user dashboard, plus an admin dashboard for managing restaurants, menu items, users, and order statuses.

## Overview

This project is designed as a full-stack-style demo app using the Next.js App Router and route handlers. It stores user, cart, order, and restaurant data in browser localStorage so the app can behave like a working storefront even without a backend database.

## Features

### Customer experience
- Landing page with hero section and featured restaurant recommendations
- Restaurant listing and search by cuisine or name
- Restaurant detail page with categories and item selection
- Cart with quantity controls and dynamic totals
- Checkout flow with order placement
- Order confirmation page with generated order IDs
- User dashboard with addresses, payment methods, and order history
- Authentication flow with login and signup

### Admin experience
- Dashboard with KPI cards and overview metrics
- Order management with status updates
- Restaurant management with add/edit/delete actions
- Menu management with add/edit/delete item actions
- User management and role switching
- Platform settings panel

## Tech stack

- Next.js 16
- React 19
- JavaScript
- CSS Modules and custom global CSS
- Lucide React icons
- Context API for auth, cart, and ordering state
- App Router API routes

## Project structure

```bash
.
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   ├── api/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── restaurant/
│   │   ├── restaurants/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/
│   ├── context/
│   ├── data/
│   └── app...
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── README.md
├── LICENSE
└── public/
```

## Local setup

### Prerequisites

- Node.js 18+ recommended
- npm

### Install dependencies

```bash
npm install
```

### Run the app in development mode

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

### Production build

```bash
npm run build
npm start
```

## Demo accounts

The app includes demo users for quick testing:

- Customer
  - Email: sulaima@email.com
  - Password: user123

- Admin
  - Email: admin@foodly.com
  - Password: admin123

## Notes

- The app uses browser localStorage for persistence, so data is stored on the client side.
- API routes are present for demo scenarios, but the interface is primarily driven by app state and local persistence.
- The project was verified with lint and production build checks in the workspace.

## License

This project is licensed under the MIT License.
