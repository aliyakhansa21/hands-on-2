# Sistoko — SISTECH 2026 Hands-On Task 2

Hi! This repository contains **Sistoko**, a simple e-commerce storefront built as the final deliverable for the **Front-End Engineering Hands-On Task 2** at SISTECH 2026.

This project demonstrates my ability to consume a real REST API, manage client-side state, and build a functional shopping experience using modern React and Next.js patterns.

---

## 🚀 Features

This project implements several key frontend concepts required for the task:

- **Real-time API Integration** — All products are fetched directly from the SISTECH E-Commerce API using a centralized service layer with proper error handling and data normalization.
- **Dynamic Product Listing** — Utilizes React's `.map()` to dynamically render product cards from API data, including discount badges, stock status, ratings, and featured/new arrival labels.
- **Search & Filtering** — Includes a live search input and category filter that dynamically narrow down displayed products without mutating the original state.
- **Sorting** — Products can be sorted by price (low–high, high–low), rating, or name, computed via `useMemo` for performance.
- **Conditional Rendering** — Displays contextual UI states: a loading skeleton while fetching, an error state with a retry button on failure, and an empty state when no products match the filter.
- **Product Detail Page** — Each product has a dedicated detail page (`/product/[id]`) fetched by ID from the API, showing full description, brand, store, and stock information.
- **Shopping Cart** — A client-side cart powered by React Context and `localStorage` persistence. Supports adding items, adjusting quantity via a stepper, and removing items, with a live item count badge in the navbar.
- **Reusable Components** — UI is broken down into focused, reusable components: `ProductCard`, `ProductGrid`, `SearchBar`, `Navbar`, `LoadingSkeleton`, `ErrorState`, and `EmptyState`.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js** | React framework (App Router) for routing and server/client rendering. |
| **React** | Core library for building interactive UI with hooks (`useState`, `useEffect`, `useMemo`, `useContext`). |
| **Tailwind CSS** | Utility-first CSS framework for rapid and responsive styling. |
| **SISTECH E-Commerce API** | Backend REST API as the single source of truth for all product data. |

---

## 💻 Getting Started

To run this project locally, follow these steps:

**1. Clone the repository:**
```bash
git clone https://github.com/aliyakhansa21/hands-on-2.git
```

**2. Navigate to the project directory:**
```bash
cd hands-on-2
```

**3. Install the dependencies:**
```bash
npm install
```

**4. Set up environment variables:**

Create a `.env.local` file in the root directory and add the API base URL:
```env
NEXT_PUBLIC_API_URL=https://your-api-url-here.com
```

**5. Start the development server:**
```bash
npm run dev
```

**6.** Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
