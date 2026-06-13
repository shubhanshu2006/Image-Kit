# 📸 ImageKit Shop

A premium, full-stack image e-commerce platform built with **Next.js 15**, **React 19**, **MongoDB**, **ImageKit**, **Razorpay**, and **NextAuth**. This application allows users to browse, purchase, and download high-quality images with different aspect ratios and licenses, while providing admins with a dashboard to manage products.

---

## 🚀 Key Features

*   **👥 User Authentication:** Secure signup and login powered by `NextAuth` (Credentials Provider) with custom JWT role-based access control (`user` vs `admin`).
*   **🖼️ Dynamic Image Processing:** Real-time crop, resize, watermark, and quality optimization via **ImageKit Integration** for both previews and purchased high-resolution downloads.
*   **💳 Payment Gateway Integration:** Seamless payments via **Razorpay**, including automatic checkout and secure backend webhook verification (HMAC-SHA256).
*   **📧 Email Confirmations:** Automatic email receipt generation with order details using **Nodemailer** routed through a **Mailtrap** SMTP sandbox.
*   **🛡️ Secure Routing:** Custom Next.js Middleware to protect admin routes (`/admin`) and user profiles (`/orders`).
*   **🎨 Premium Responsive UI:** Clean glassmorphism elements, dark modes, and micro-interactions built with **Tailwind CSS** and **daisyUI**.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend Framework** | Next.js 15 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS, daisyUI, Lucide React Icons |
| **Authentication** | NextAuth.js (v4) |
| **Database** | MongoDB, Mongoose ODM |
| **Storage & Image CDN** | ImageKit.io |
| **Payments** | Razorpay SDK & Webhooks |
| **Email Deliverability** | Nodemailer, Mailtrap |

---

## 📂 Project Architecture

```filepath
├── app/
│   ├── admin/                # Admin Panel (Product Creation)
│   ├── api/
│   │   ├── auth/             # NextAuth config and Registration API
│   │   ├── imagekit-auth/    # Secure client-side upload signature API
│   │   ├── orders/           # Order creation & user-specific order retrieval
│   │   ├── products/         # Product listing and detail endpoints
│   │   └── webhook/          # Razorpay payment verification webhook
│   ├── components/           # Reusable UI (FileUpload, ProductCard, Navbar, etc.)
│   ├── orders/               # User order history & download dashboard
│   ├── products/             # Product detail and variant purchasing pages
│   ├── globals.css           # Global Tailwind and daisyUI themes
│   └── layout.tsx            # Context Providers (Auth, Notification) wrapper
├── lib/
│   ├── api-client.ts         # Centralized frontend API handler
│   ├── auth.ts               # NextAuth setup and authorize callback logic
│   └── db.ts                 # MongoDB Mongoose cached connection handler
├── models/
│   ├── User.ts               # Mongoose Schema for Users (roles, hashed passwords)
│   ├── Product.ts            # Mongoose Schema for Products (SQUARE, WIDE, PORTRAIT dimensions)
│   └── Order.ts              # Mongoose Schema for Orders (statuses, payment IDs)
├── scripts/
│   ├── seed.js               # Database seeder script for initial products
│   └── mail-test.js          # Independent script to verify SMTP transport configuration
└── middleware.ts             # Global path authorization and security rules
```

---

## ⚙️ Setup & Installation

### 1. Prerequisites
Ensure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (v18.x or later)
*   [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)
*   An [ImageKit.io](https://imagekit.io) Account
*   A [Razorpay](https://razorpay.com) developer account (Test mode)
*   A [Mailtrap](https://mailtrap.io) inbox for testing emails

### 2. Clone the Repository
```bash
git clone <repository-url>
cd image-ecommerce-main
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory and copy the contents from `.env.example`. Fill in the values:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/image-shop

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# ImageKit Configuration (Public/Private keys)
NEXT_PUBLIC_PUBLIC_KEY=your_imagekit_public_key_here
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key_here
NEXT_PUBLIC_URL_ENDPOINT=your_imagekit_url_endpoint_here

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_secret_here
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret_here

# Mailtrap SMTP Configuration
MAILTRAP_HOST=your_mailtrap_host_here
MAILTRAP_PORT=your_mailtrap_port_here
MAILTRAP_USER=your_mailtrap_user_here
MAILTRAP_PASS=your_mailtrap_password_here
```

### 5. Seed Database (Optional)
To populate your MongoDB database with dummy products, run:
```bash
npm run seed
```

### 6. Run the Application
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 API Reference

### Products
*   `GET /api/products` - Returns a list of all products.
*   `GET /api/products/[id]` - Returns a single product by ID.
*   `POST /api/products` - Creates a new product with custom variants. *(Admin credentials required)*

### Orders & Payments
*   `POST /api/orders` - Initializes a new order and returns the Razorpay `orderId`.
*   `GET /api/orders/user` - Fetches the authenticated user's order history.
*   `POST /api/webhook/razorpay` - Receives Razorpay payment confirmation event, updates database status, and triggers confirmation email.

### Authentication
*   `POST /api/auth/register` - Signs up a new user.
*   `GET /api/imagekit-auth` - Generates secure client-side upload signatures.

---

## 📸 Image Variant Configurations

The shop dynamically crops and serves images via ImageKit based on selected sizes and licensing options:

*   **Square (1:1)**: Optimized at `1200 x 1200 px`
*   **Widescreen (16:9)**: Optimized at `1920 x 1080 px`
*   **Portrait (3:4)**: Optimized at `1080 x 1440 px`

Unpurchased previews are rendered at a lower quality optimization level (`q-60`), while purchased high-quality downloads are available directly at 100% quality using the custom transformed URLs.
