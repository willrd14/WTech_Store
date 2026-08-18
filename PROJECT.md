# WTech Store - Project Documentation

> **Stack:** React 19 + Vite 8 + Tailwind CSS 3 + Supabase + Express 4 + PayPal (Sandbox)
> **Design:** Dark cyberpunk/tech theme from Stitch project
> **Database:** Supabase (PostgreSQL) hosted at `lhhyuismzzsyddsnxjjk.supabase.co`

---

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [Design System & Theme](#2-design-system--theme)
3. [Supabase Database Schema](#3-supabase-database-schema)
4. [Authentication](#4-authentication)
5. [Frontend Components](#5-frontend-components)
6. [Frontend Pages](#6-frontend-pages)
7. [Contexts (State Management)](#7-contexts-state-management)
8. [Services & API](#8-services--api)
9. [Backend (Express Server)](#9-backend-express-server)
10. [Payment (PayPal)](#10-payment-paypal)
11. [Routing](#11-routing)
12. [Product Data](#12-product-data)
13. [Implemented Changes](#13-implemented-changes)
14. [Pending Changes](#14-pending-changes)
15. [Environment Variables](#15-environment-variables)

---

## 1. Project Structure

```
WTech-Store/
├── client/                          # React frontend (Vite)
│   ├── .env                         # Vite env vars (Supabase, PayPal, API URL)
│   ├── .env.example
│   ├── .oxlintrc.json
│   ├── index.html                   # Google Fonts + Material Symbols loaded here
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js           # Full design theme (colors, fonts, spacing)
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx                 # BrowserRouter > AuthProvider > CartProvider > App
│       ├── App.jsx                  # Routes + Header + Footer layout
│       ├── index.css                # Tailwind directives + glass-panel + neon-glow utilities
│       ├── components/
│       │   ├── Header/Header.jsx
│       │   ├── Footer/Footer.jsx
│       │   ├── Hero/Hero.jsx
│       │   ├── CategoryBento/CategoryBento.jsx
│       │   ├── FeaturedProducts/FeaturedProducts.jsx
│       │   ├── ProductCard/ProductCard.jsx
│       │   ├── ProductGrid/ProductGrid.jsx
│       │   ├── FilterSidebar/FilterSidebar.jsx
│       │   ├── AddToCartPopup/AddToCartPopup.jsx   # NEW: Modal after adding to cart
│       │   ├── CartItem/              # (empty)
│       │   ├── CartSidebar/           # (empty)
│       │   ├── Newsletter/            # (empty)
│       │   └── SearchBar/             # (empty)
│       ├── context/
│       │   ├── AuthContext.jsx         # Now exports `profile` too
│       │   └── CartContext.jsx         # Now has showPopup, lastAdded, closePopup
│       ├── data/
│       │   └── products.js            # 8 products with discount + createdAt fields
│       ├── hooks/                     # (empty)
│       ├── pages/
│       │   ├── Home/Home.jsx
│       │   ├── Products/Products.jsx   # Now handles ?sort=new, ?deals=true
│       │   ├── ProductDetail/ProductDetail.jsx
│       │   ├── Cart/Cart.jsx
│       │   ├── Checkout/Checkout.jsx   # Improved readability + address autofill
│       │   ├── Contact/Contact.jsx     # Now sends email via backend
│       │   ├── About/About.jsx
│       │   ├── Auth/
│       │   │   ├── Login/Login.jsx
│       │   │   └── Register/Register.jsx  # Now includes address fields
│       │   └── Admin/                              # NEW: Admin panel
│       │       ├── AdminLayout.jsx                # NEW: Sidebar nav layout
│       │       ├── Dashboard.jsx                  # NEW: Stats cards
│       │       ├── AdminProducts.jsx              # NEW: Products table CRUD
│       │       ├── ProductForm.jsx                # NEW: Create/edit product
│       │       └── AdminOrders.jsx                # NEW: Orders management
│       ├── services/
│       │   ├── supabase.js
│       │   ├── api.js                 # Now has admin + support API methods
│       │   └── schema.sql             # Now has profiles ALTER TABLE migration
│       ├── utils/
│       │   └── formatPrice.js         # NEW: RD$ formatting + discount price helpers
│       ├── hooks/                     # (empty)
│       ├── styles/                    # (empty)
│
├── server/                           # Express backend
│   ├── .env                          # Supabase + PayPal + PORT=3001
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── app.js                    # Express entry point, CORS, routes, error handler
│       ├── config/
│       │   ├── supabase.js           # Supabase client (SUPABASE_URL + SUPABASE_ANON_KEY)
│       │   └── paypal.js             # PayPal REST API helpers (getAccessToken, paypalFetch)
│       ├── controllers/
│       │   ├── productController.js  # getProducts, getProduct, getProductsByCategory, getFeaturedProducts
│       │   ├── orderController.js    # createOrder, captureOrder, getOrders, getOrder
│       │   ├── adminController.js    # NEW: Dashboard stats, product CRUD, order management
│       │   └── supportController.js  # NEW: Sends support emails via Nodemailer
│       ├── middleware/
│       │   ├── auth.js               # auth() + optionalAuth() middleware (Bearer token)
│       │   ├── admin.js              # NEW: adminAuth() — requires auth + admin role
│       │   └── errorHandler.js       # Express error handler
│       ├── migrations/
│       │   └── 002_admin.sql         # NEW: role column, is_admin(), admin RLS
│       └── routes/
│           ├── productRoutes.js
│           ├── orderRoutes.js
│           ├── adminRoutes.js        # NEW: All admin CRUD routes
│           └── supportRoutes.js      # NEW: POST /api/support
│
├── .gitignore
├── stitch_landing.html              # Stitch design reference
├── stitch_catalogo.html
├── stitch_carrito.html
└── PROJECT.md                       # This file
```

---

## 2. Design System & Theme

### Colors (from Stitch)
The entire app uses a **dark cyberpunk/tech** aesthetic. Key colors:

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#050B10` | Main bg, body background |
| `primary-container` | `#00f2ff` | Cyan neon accent — buttons, links, glows, borders |
| `primary` | `#e1fdff` | Light text on dark surfaces |
| `primary-fixed` | `#74f5ff` | Price text, secondary accent |
| `surface` | `#0d1419` | Card/panel backgrounds |
| `surface-container` | `#1a2026` | Input backgrounds, inner panels |
| `surface-container-highest` | `#2f363b` | Image placeholders |
| `on-surface` | `#dde3eb` | Main body text |
| `on-surface-variant` | `#b9cacb` | Secondary/muted text |
| `outline` | `#849495` | Borders, dividers |
| `outline-variant` | `#3a494b` | Subtle borders |
| `on-primary` | `#00363a` | Text on cyan buttons (dark) |
| `on-background` | `#dde3eb` | Body text color |

### Fonts
- **Space Grotesk** — Display, headlines (`font-display-lg`)
- **Inter** — Body text (`font-body-md`)
- **JetBrains Mono** — Labels, caps, badges (`font-label-caps`)
- **Material Symbols Outlined** — Icons (loaded via Google Fonts)

### Custom CSS Classes (index.css)
```css
.glass-panel        /* Glassmorphism panel: rgba(0,26,46,0.6) + blur + cyan border */
.glass-panel-hover  /* Hover state with brighter border */
.neon-glow           /* box-shadow: 0px 0px 15px rgba(0,242,255,0.2) */
.neon-glow-hover     /* Hover: stronger glow (0.6 opacity) */
.neon-glow-strong    /* Strong glow (0.5 opacity) */
.circuit-line        /* Decorative circuit line with cyan dot */
.circuit-line-h      /* Horizontal gradient line */
.circuit-line-v      /* Vertical gradient line */
.cyber-glass         /* Simpler glass variant */
.cyber-border-gradient /* Gradient border */
.text-gradient-cyan  /* Gradient text: cyan → purple */
.bg-gradient-radial  /* Radial gradient background */
```

### Tailwind Theme Keys
```js
// Fonts
font-display-lg    → "Space Grotesk"
font-body-md       → "Inter"
font-label-caps    → "JetBrains Mono"

// Font sizes (with line-height, letter-spacing, weight)
text-display-lg    → 72px / 80px / -0.02em / 700
text-body-md       → 16px / 24px / 400
text-label-caps    → 12px / 16px / 0.1em / 500
text-headline-lg-mobile → 32px / 40px / 600
text-headline-lg   → 40px / 48px / 600

// Border radius (unusually small — cyberpunk angular style)
rounded DEFAULT    → 0.125rem (2px)
rounded-lg         → 0.25rem (4px)
rounded-xl         → 0.5rem (8px)
rounded-full       → 0.75rem (12px)
```

### Body Background
```css
body {
  background-color: #050B10;
  background-image:
    linear-gradient(rgba(0,242,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,242,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px; /* Subtle cyan grid pattern */
}
```

---

## 3. Supabase Database Schema

### Tables
```sql
products      -- id, name, slug, description, price, category, image, images[], features[],
               -- rating, reviews_count, in_stock, badge, created_at, updated_at

orders        -- id, user_id (UUID→auth.users), status (pending/paid/shipped/delivered/cancelled),
               -- subtotal, shipping_cost, tax, total, shipping_address (JSONB),
               -- payment_intent_id, created_at, updated_at

order_items   -- id, order_id→orders, product_id→products, quantity, unit_price, created_at

profiles      -- id (UUID→auth.users PK), name, email, avatar_url, created_at, updated_at
```

### Triggers
- `on_auth_user_created` — Auto-creates a `profiles` row when a user signs up
- `update_*_updated_at` — Auto-updates `updated_at` on products, orders, profiles

### RLS Policies
- **products**: Public read
- **orders**: Users can SELECT/INSERT their own (by `auth.uid() = user_id`)
- **order_items**: Users can SELECT/INSERT items from their orders
- **profiles**: Users can SELECT/UPDATE/INSERT their own

---

## 4. Authentication

### AuthContext (`context/AuthContext.jsx`)
Provides:
```js
{ user, loading, login, register, loginWithGoogle, logout }
```

- `login(email, password)` — `supabase.auth.signInWithPassword`
- `register(name, email, password)` — `supabase.auth.signUp` with `options: { data: { name } }`
- `loginWithGoogle()` — `supabase.auth.signInWithOAuth({ provider: "google", redirectTo: origin })`
- `logout()` — `supabase.auth.signOut`
- Listens to `onAuthStateChange` for session updates

### Login Page (`pages/Auth/Login/Login.jsx`)
- Email + password inputs
- "Login" button calls `login(email, password)`
- Google OAuth button calls `loginWithGoogle()`
- Error display with `error` state
- Link to register page

### Register Page (`pages/Auth/Register/Register.jsx`)
- Name + email + password inputs
- "Register" button calls `register(name, email, password)`
- Google OAuth button calls `loginWithGoogle()`
- Error display
- Link to login page

### Server Auth Middleware (`server/src/middleware/auth.js`)
- `auth()` — Extracts Bearer token → `supabase.auth.getUser(token)` → sets `req.user`
- `optionalAuth()` — Same but doesn't fail if no token

---

## 5. Frontend Components

### Header (`components/Header/Header.jsx`)
- **Nav links:** Catalog (`/products`), New Arrivals (`/products?sort=new`), Deals (`/products?deals=true`), Support (`/contact`)
- Sticky top nav with glassmorphism background
- Cart icon with badge count (from `useCart().cartCount`)
- Account icon → `/login`
- Search input (decorative, no functionality yet)
- Mobile hamburger menu
- **NOTE:** Nav links pass query params (`?sort=new`, `?deals=true`) but `Products.jsx` doesn't handle them yet

### Footer (`components/Footer/Footer.jsx`)
- Links: Warranty, Privacy Policy, Technical Specs, Store Locator (all go to `/about`)
- Copyright notice

### Hero (`components/Hero/Hero.jsx`)
- Full-width hero with gradient blob, animated pulse badge
- "Initialize Sequence" CTA → `/products`
- "View Specs" secondary CTA → `/products`
- Product image from Stitch CDN URL

### CategoryBento (`components/CategoryBento/CategoryBento.jsx`)
- Bento grid layout showing 4 categories from `data/products.js`
- Each links to `/products?category=<id>`

### FeaturedProducts (`components/FeaturedProducts/FeaturedProducts.jsx`)
- Shows first 4 products from `getFeaturedProducts()`
- "View All Data" link → `/products`
- Add to cart button (calls `addItem`)
- **NOTE:** Displays price as `{product.price} CR` — needs fixing to DOP format

### ProductCard (`components/ProductCard/ProductCard.jsx`)
- Glass panel card with image, name, description, rating, price (RD$ format)
- "IN STOCK" badge, custom badge (e.g. "NEW", "V2.0")
- Discounted products show original price struck through + sale price + discount badge
- "ADD" button calls `addItem(product)` — triggers AddToCartPopup
- Links to `/products/:id`

### ProductGrid (`components/ProductGrid/ProductGrid.jsx`)
- Renders array of `ProductCard` components in a responsive grid
- Empty state with "search_off" icon

### FilterSidebar (`components/FilterSidebar/FilterSidebar.jsx`)
- Category checkboxes (from `data/products.js` categories)
- Price range slider (0-500)
- Feature checkboxes (MagSafe, Fast Charging, Wireless)
- "On Sale" checkbox filter — shows only products with discount > 0
- All filters work with `Products.jsx` filter system

---

## 6. Frontend Pages

### Home (`pages/Home/Home.jsx`)
```jsx
<Hero />
<CategoryBento />
<FeaturedProducts />
```

### Products (`pages/Products/Products.jsx`)
- Reads `?category=<id>`, `?sort=new`, `?deals=true` from URL params
- Client-side filtering: by categories array, maxPrice, features, search text, onSale
- Sorting: low-to-high, high-to-low, name, newest (sorted from `useMemo`)
- `?sort=new` → filters by badge "NEW"/"NEW RELEASE"
- `?deals=true` → shows only products with discount > 0
- Layout: FilterSidebar + ProductGrid side by side
- Filter state managed with `useState` — synced to URL params

### ProductDetail (`pages/ProductDetail/ProductDetail.jsx`)
- Reads `:id` from URL params
- Gets product from local `data/products.js` via `getProductById(id)`
- Breadcrumb navigation
- Image, features, rating, reviews count
- Quantity selector (+/-)
- "Add to Cart" and "Buy Now" buttons
- **NOTE:** Does NOT use the backend API — reads from local data only

### Cart (`pages/Cart/Cart.jsx`)
- Displays all cart items with quantity +/- controls and delete
- Order summary sidebar with subtotal, shipping (FREE), total
- "Proceed to Checkout" button → `/checkout`
- Empty state with shopping cart icon

### Checkout (`pages/Checkout/Checkout.jsx`)
- Wrapped in `<PayPalScriptProvider>` with `VITE_PAYPAL_CLIENT_ID`
- Shipping address form pre-filled from user profile (if logged in)
- Form has proper visible labels + lighter input backgrounds (readable)
- PayPal buttons (PayPalButtons from `@paypal/react-paypal-js`)
  - `createOrder` → `api.createPaypalOrder(items)`
  - `onApprove` → `api.capturePaypalOrder(orderID)` → clearCart → navigate
- Order summary sidebar
- Success state after payment
- Saves address to profile after successful payment

### Contact/Support (`pages/Contact/Contact.jsx`)
- Form: name, email, subject (dropdown), message
- "Send Message" button sends to `POST /api/support`
- Loading state while sending, success/error feedback
- Backend uses Nodemailer to send email to admin

### About (`pages/About/About.jsx`)
- Static page with mission statement, 3 value cards, company story

---

## 7. Contexts (State Management)

### CartContext (`context/CartContext.jsx`)
```js
{
  items,              // Array of { ...product, quantity }
  addItem(product),   // Adds item or increments quantity, triggers popup
  removeItem(id),     // Removes item by id
  updateQuantity(id, qty),  // Sets quantity (removes if <= 0)
  clearCart(),        // Empties cart
  cartCount,          // Total items count
  subtotal,           // Sum of (price × quantity)
  showPopup,          // Boolean — is add-to-cart popup visible?
  lastAdded,          // The last product added (shown in popup)
  closePopup(),       // Closes the popup
}
```
- **In-memory only** — cart lost on page refresh
- Items are the full product objects with added `quantity` field

### AuthContext (`context/AuthContext.jsx`)
- Wraps entire app (in `main.jsx`)
- Provides `user`, `loading`, `profile`, `login`, `register`, `loginWithGoogle`, `logout`
- `user` is the Supabase auth user object (or null)
- `profile` is the user's profile from `profiles` table (includes name, email, phone, address_line1, address_line2, city, postal_code)

---

## 8. Services & API

### Supabase Client (`services/supabase.js`)
```js
import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);
```

### API Service (`services/api.js`)
```js
// Products
api.getProducts(filters)         // GET /api/products?category=&maxPrice=&sort=&search=
api.getProduct(id)               // GET /api/products/:id

// Orders
api.createPaypalOrder(items)     // POST /api/orders/create
api.capturePaypalOrder(orderId)  // POST /api/orders/capture
api.getOrders()                  // GET /api/orders (auth required)

// Support
api.sendSupportMessage(data)     // POST /api/support { name, email, subject, message }

// Admin (all require admin auth)
api.getAdminStats()              // GET /api/admin/dashboard
api.getAdminProducts(params)     // GET /api/admin/products?page=&limit=
api.createAdminProduct(data)     // POST /api/admin/products
api.updateAdminProduct(id, data) // PUT /api/admin/products/:id
api.deleteAdminProduct(id)       // DELETE /api/admin/products/:id
api.getAdminOrders(params)       // GET /api/admin/orders?page=&limit=
api.updateAdminOrder(id, data)   // PUT /api/admin/orders/:id
```
- All requests include `Authorization: Bearer <supabase_access_token>` when session exists
- Base URL from `VITE_API_URL` (defaults to `http://localhost:3001`)

---

## 9. Backend (Express Server)

### Server Entry (`server/src/app.js`)
- Port: 3001
- CORS: allows `localhost:5173` and `localhost:3000`
- Routes:
  - `GET /api/health` → `{ status: "ok", timestamp }`
  - `/api/products` → productRoutes
  - `/api/orders` → orderRoutes
  - `/api/admin` → adminRoutes (adminAuth middleware)
  - `/api/support` → supportRoutes

### Product Controller (`server/src/controllers/productController.js`)
| Handler | Endpoint | Description |
|---------|----------|-------------|
| `getProducts` | `GET /api/products` | Filter by category, maxPrice, sort (low/high/name), search |
| `getProduct` | `GET /api/products/:id` | Get single product by ID |
| `getProductsByCategory` | `GET /api/products/category/:category` | All products in category |
| `getFeaturedProducts` | `GET /api/products/featured` | Top 4 by rating |

### Admin Controller (`server/src/controllers/adminController.js`)
| Handler | Endpoint | Description |
|---------|----------|-------------|
| `getDashboard` | `GET /api/admin/dashboard` | Stats: product count, order count, revenue |
| `getProducts` | `GET /api/admin/products` | All products with pagination |
| `createProduct` | `POST /api/admin/products` | Create new product |
| `updateProduct` | `PUT /api/admin/products/:id` | Update product |
| `deleteProduct` | `DELETE /api/admin/products/:id` | Delete product |
| `getOrders` | `GET /api/admin/orders` | All orders with pagination |
| `updateOrder` | `PUT /api/admin/orders/:id` | Update order status |

### Support Controller (`server/src/controllers/supportController.js`)
| Handler | Endpoint | Description |
|---------|----------|-------------|
| `sendSupportEmail` | `POST /api/support` | Sends email via Nodemailer SMTP |

### Order Controller (`server/src/controllers/orderController.js`)
| Handler | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| `createOrder` | `POST /api/orders/create` | optionalAuth | Creates PayPal checkout order |
| `captureOrder` | `POST /api/orders/capture` | optionalAuth | Captures payment, saves to DB |
| `getOrders` | `GET /api/orders` | required | Get user's orders |
| `getOrder` | `GET /api/orders/:id` | required | Get single order |

### PayPal Config (`server/src/config/paypal.js`)
- Uses **raw PayPal REST API** (no SDK) with `fetch`
- `getAccessToken()` — OAuth2 token with caching
- `paypalFetch(path, options)` — Wrapper that adds Bearer token
- Sandbox API: `https://api-m.sandbox.paypal.com`

### Auth Middleware (`server/src/middleware/auth.js`)
```js
auth()         // Required — extracts Bearer token, verifies with supabase.auth.getUser()
optionalAuth() // Optional — same but continues if no token
```

---

## 10. Payment (PayPal)

### Flow
1. Frontend: User clicks PayPal button in Checkout
2. Frontend: `createOrder` calls `api.createPaypalOrder(items)` → `POST /api/orders/create`
3. Backend: Fetches products from Supabase, calculates total, creates PayPal order via REST API
4. Backend: Returns `{ id, status: "CREATED" }` to frontend
5. Frontend: PayPal SDK renders approval flow
6. Frontend: On approval, `onApprove` calls `api.capturePaypalOrder(orderID)` → `POST /api/orders/capture`
7. Backend: Captures payment via PayPal API, saves order + order_items to Supabase
8. Frontend: Clears cart, navigates to success state

### Frontend PayPal Setup
```jsx
<PayPalScriptProvider
  options={{
    clientId: VITE_PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  }}
>
```
**NOTE:** Currency is USD — needs changing to DOP for all pricing.

### Backend PayPal Setup
- Client ID + Secret from `.env`
- Sandbox environment
- Token cached for the duration of its validity

---

## 11. Routing

### Current Routes (App.jsx)
```jsx
<Route path="/"                element={<Home />} />
<Route path="/products"        element={<Products />} />
<Route path="/products/:id"    element={<ProductDetail />} />
<Route path="/cart"            element={<Cart />} />
<Route path="/checkout"        element={<Checkout />} />
<Route path="/contact"         element={<Contact />} />
<Route path="/about"           element={<About />} />
<Route path="/login"           element={<Login />} />
<Route path="/register"        element={<Register />} />
<Route path="/admin"           element={<AdminLayout />}>
  <Route index                 element={<Dashboard />} />
  <Route path="products"       element={<AdminProducts />} />
  <Route path="products/new"   element={<ProductForm />} />
  <Route path="products/:id/edit" element={<ProductForm />} />
  <Route path="orders"         element={<AdminOrders />} />
</Route>
```

### Header Nav Links
```js
{ label: "Catalog",      path: "/products" },
{ label: "New Arrivals", path: "/products?sort=new" },     // ✅ Now works
{ label: "Deals",        path: "/products?deals=true" },   // ✅ Now works
{ label: "Support",      path: "/contact" },
```
Admin shield icon appears in header for admin users → `/admin`.

---

## 12. Product Data

### Local Data (`data/products.js`)
8 products with fields:
```js
{
  id, name, category, price, rating, badge, image, description,
  features: [], inStock: bool,
  discount: Number,     // Percentage (0 = no discount)
  createdAt: String     // ISO date
}
```

Discounts applied:
- Mag-Lock Mount: 20% off
- Super-Sonic GaN Charger: 15% off
- Liquid Crystal Protector: 25% off

### Categories
```js
cases              → "Core Protection" / "Cyber-Armored Cases"
chargers           → "Power Systems" / "Fast-Charge Hubs"
screen-protectors  → "Visual Shields" / "Tempered Glass"
mounts             → "Magnetic Mounts" / "Auto-Align Systems"
```

### Helper Functions
```js
getProductsByCategory(categoryId)
getProductById(id)
getFeaturedProducts()       // First 4 products
getNewArrivals()            // Filter by badge === "NEW" || "NEW RELEASE"
```

### Supabase Products Table
Has additional fields vs local data: `slug`, `images[]`, `reviews_count`, `created_at`, `updated_at`.

**NOTE:** Prices are in DOP (Dominican Pesos). All prices displayed as `RD$` format. PayPal processes in USD — conversion rate applied server-side.

---

## 13. Implemented Changes

### 13.1 ✅ DOP Prices
- Product prices converted to Dominican Pesos in `data/products.js`
- Created `utils/formatPrice.js` with `formatPrice()` (RD$ format) and `getDiscountedPrice()`
- All price displays updated: ProductCard, FeaturedProducts, Cart, Checkout, ProductDetail, FilterSidebar
- Products now have `discount` field (percentage) and `createdAt` date
- Discounted products show original price crossed out + sale price + discount badge

### 13.2 ✅ New Arrivals + Deals
- `Products.jsx` reads `?sort=new` → filters by badge "NEW"/"NEW RELEASE"
- `Products.jsx` reads `?deals=true` → shows only products with discount > 0
- `FilterSidebar.jsx` has "ON SALE" checkbox filter
- Products sorted by `createdAt` for "newest" option
- Dynamic header title based on active view

### 13.3 ✅ Support Email
- Backend `POST /api/support` endpoint with Nodemailer SMTP
- `Contact.jsx` wired to send emails with loading/success/error states
- Environment vars: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SUPPORT_EMAIL`

### 13.4 ✅ Checkout Readability
- Inputs use `bg-surface-container-high` (lighter background)
- Proper labels above every input (not just placeholders)
- Visible borders that highlight on focus
- Phone field added
- Light separators between sections

### 13.5 ✅ Auto-fill Address
- `AuthContext` now fetches and exports `profile` from profiles table
- `Register.jsx` includes optional address fields (phone, address, city, postal code)
- `Checkout.jsx` pre-fills shipping form from profile data
- Address saved to profile after successful payment
- Schema migration: profiles table gets phone, address_line1, address_line2, city, postal_code

### 13.6 ✅ Add-to-Cart Popup
- `AddToCartPopup.jsx` — modal with product info + two buttons
- CartContext now has `showPopup`, `lastAdded`, `closePopup` state
- "Proceed to Checkout" → navigates to /checkout
- "Continue Shopping" → closes modal
- Animated entrance (fade + slide)

### 13.7 ✅ Admin Panel
- `/admin` route with protected layout (AdminLayout.jsx)
- Dashboard with stats (products, orders, revenue)
- Product CRUD: list, create, edit, delete (AdminProducts.jsx, ProductForm.jsx)
- Order management with status updates (AdminOrders.jsx)
- Admin middleware: `adminAuth()` checks role === 'admin'
- Admin icon in Header for admin users
- SQL migration: adds `role` column to profiles, `is_admin()` function, admin RLS policies

---

## 14. Pending Changes

### 14.1 🔲 Auth: Google OAuth Verification
- Auth code is implemented but Google provider must be enabled in Supabase dashboard
- Verify: Supabase > Authentication > Providers > Google is enabled with correct Client ID/Secret

### 14.2 🔲 Deploy to Cloudflare
- **Frontend:** Cloudflare Pages (build: `npm run build`, output: `dist/`)
- **Backend:** Options — Cloudflare Workers (rewrite with Hono), VPS, or Cloudflare Tunnel
- **Database:** Already on Supabase (cloud), no change needed
- Update `VITE_API_URL` to production backend URL

---

## 15. Environment Variables

### Client (.env)
```
VITE_SUPABASE_URL=https://lhhyuismzzsyddsnxjjk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
VITE_PAYPAL_CLIENT_ID=AeqZMR6FIXZeglCevik_MA41EDM4R35R_bOaPcBfiDT3bkYOSBKlyJ_wIeUkrz9iAVQ_3Nx2K9jKOubo
VITE_API_URL=http://localhost:3001
```

### Server (.env)
```
SUPABASE_URL=https://lhhyuismzzsyddsnxjjk.supabase.co
SUPABASE_ANON_KEY=eyJhbGci...
PAYPAL_CLIENT_ID=AeqZMR6FIXZeglCevik_MA41EDM4R35R_bOaPcBfiDT3bkYOSBKlyJ_wIeUkrz9iAVQ_3Nx2K9jKOubo
PAYPAL_CLIENT_SECRET=ECx1UYo8u8Q3IpGczLLqb82gkk8AAtx1nUvMdEIbZdp2by5y80LMz-Dqk6-GbQb9ur6-EZxatj5Zp9GW
PAYPAL_MODE=sandbox
PORT=3001
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SUPPORT_EMAIL=recipient@example.com
```

### Required Supabase SQL Migrations
Run these in Supabase SQL Editor:
1. `client/src/services/schema.sql` — Initial schema (products, orders, order_items, profiles + RLS + triggers)
2. `server/src/migrations/002_admin.sql` — Adds role column, is_admin(), admin RLS

To make a user admin:
```sql
UPDATE profiles SET role = 'admin' WHERE id = '<user-uuid>';
```

---

## Running the Project

```bash
# Backend (Terminal 1)
cd server && node src/app.js    # Runs on http://localhost:3001

# Frontend (Terminal 2)
cd client && npm run dev         # Runs on http://localhost:5173
```

### Available npm scripts
| Location | Script | Command |
|----------|--------|---------|
| client | `dev` | `vite` |
| client | `build` | `vite build` |
| client | `lint` | `oxlint` |
| server | `dev` | `node --watch src/app.js` |
| server | `start` | `node src/app.js` |

---

## Known Issues / Tech Debt

1. **Duplicate product data** — Local `data/products.js` AND Supabase `products` table. Some pages use local, some use API.
2. **Cart not persisted** — CartContext is in-memory only; lost on refresh.
3. **No validation** — Forms (register, login, checkout, contact) have no input validation.
4. **Images** — Products reference `/images/products/*.png` which don't exist locally (need to be added to `public/`).
5. **PayPal currency** — PayPal processes in USD. Prices displayed in DOP but payment happens in USD. Consider adding server-side conversion rate.
6. **SMTP not configured** — Support email requires real SMTP credentials in server `.env`.
7. **Admin role** — No UI to promote users to admin. Must run SQL directly.
