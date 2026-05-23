# 🛒 Malonda — Trusted Buying & Selling in Malawi

A mobile-first e-commerce marketplace built for Malawian local traders, with strong trust, fraud prevention, and support for low-end smartphones.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+ or yarn

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
/src
  /screens
    /auth          # Splash, Login, OTP, Register, IdVerify
    /main          # Home, Search
    /products      # ProductDetail, AddProduct, EditProduct
    /cart          # Cart, Checkout, PaymentSuccess
    /orders        # Orders, OrderDetail, ConfirmDelivery, Dispute
    /chat          # ChatList, Chat
    /profile       # Profile, SellerProfile, Wishlist, Notifications, Report
    /seller        # SellerDashboard, SellerAnalytics
    /admin         # AdminPanel
  /components
    /layout        # MainLayout (bottom nav)
    /products      # ProductCard
    /trust         # TrustBadge
  /context
    AuthContext    # Session, login, logout, OTP
    CartContext    # Cart state, escrow totals
    NotificationContext  # Unread count, push
  /services
    chatService      # Socket.io real-time chat
    paymentService   # Airtel Money, TNM Mpamba, Escrow
    trustService     # Trust score calculation
    notificationService  # Push notifications
  /hooks
    useProducts.js   # Product fetching & filtering
  /utils
    mockData.js      # Development mock data
    fraudDetection.js  # Keyword & phone number scanning
    helpers.js       # Formatting utilities
  /assets
    /styles
      global.css     # All CSS variables and shared styles
  api.js             # Axios client + all API endpoints
  App.jsx            # Root with providers
  routes.jsx         # Auth-protected routing
  index.js           # React DOM entry
```

---

## 🌟 Core Features

| Feature | Description |
|---|---|
| 📱 Phone OTP Auth | Login/register via SMS OTP |
| 🛡️ ID Verification | National ID + selfie — 3 trust levels |
| 🔒 Escrow Payments | Funds held until buyer confirms delivery |
| 💬 In-App Chat | Real-time messaging, fraud keyword detection |
| 📦 Order Tracking | 5-step visual order progress |
| 🏪 Seller Dashboard | Products, sales, revenue analytics |
| 🚩 Fraud Prevention | Chat scanning, report system, admin tools |
| ⭐ Trust Scores | Verified/Trusted badges, ratings |
| ❤️ Wishlist | Save favourite products |
| 🎁 Promo Codes | Discount code support |
| 🔔 Notifications | Order, chat, and promo alerts |

---

## 💳 Payment Methods

- **Airtel Money** — STK push to customer's number
- **TNM Mpamba** — Mobile money prompt
- **Cash on Delivery** — Pay on receipt
- **Escrow system** — Platform holds funds until confirmed

---

## 🔐 Verification Levels

| Level | Requirements |
|---|---|
| 🔵 Basic | Phone number verified |
| ✅ Verified | National ID + selfie approved |
| ⭐ Trusted | Verified + 10+ successful transactions |

---

## 🌍 Environment Variables

Create a `.env` file in the root:

```env
REACT_APP_API_URL=https://api.malonda.mw/v1
REACT_APP_SOCKET_URL=https://api.malonda.mw
```

---

## 🎨 Brand Colours

| Colour | Hex | Usage |
|---|---|---|
| Green | `#1a7a4a` | Primary, headers, CTA buttons |
| Blue | `#1565c0` | Escrow badges, info panels |
| Gold | `#f5a623` | Trusted badge, star ratings |
| Red | `#c0392b` | Danger, fraud warnings |
| White | `#ffffff` | Backgrounds |

---

## 🏗️ Backend Requirements

The app expects a REST API at `REACT_APP_API_URL` with:

- `POST /auth/send-otp` · `POST /auth/verify-otp` · `POST /auth/login`
- `GET/POST /products` · `GET /products/:id`
- `POST/GET /orders` · `POST /orders/:id/confirm`
- `POST /payments/initiate` · `POST /payments/escrow/:id/release`
- `GET/POST /chat/:userId/messages` (+ Socket.io)
- `GET/POST /users/:id/report`
- `GET /admin/reports` · `POST /admin/verifications/:id/approve`

---

## 📱 Optimised For

- Low-end Android devices (2GB RAM)
- Slow 3G/4G connections
- Small screens (360px+)
- Minimal data usage

---

*Built with ❤️ for Malawi — "Trusted Buying & Selling"*
