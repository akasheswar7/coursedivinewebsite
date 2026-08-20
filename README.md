# 🎓 Course Divine — Premium Full-Stack Web Platform

> A modern, lightning-fast, production-ready full-stack educational and technology training platform built for **Course Divine** ([coursedivine.com](https://coursedivine.com/)).

---

## 🌟 Key Highlights & Features

- **Signature Blue & White Aesthetics**: Custom luxury design system using Tailwind CSS with glassmorphism, responsive cards, crisp typography (Plus Jakarta Sans & Inter), and subtle micro-interactions.
- **Complete Course Catalog (Learning Lounge)**: Real-time search, multi-category filters, skill level selection, price sorting, and dynamic slug-based course detail pages (`/courses/:slug`).
- **Curriculum & Syllabus Accordion**: Interactive modules, topic breakdowns, duration badges, and free lecture previews.
- **Razorpay Payment Gateway Integration**: Production-ready payment flow with order creation, HMAC-SHA256 signature verification, simulated sandbox checkout modal, instant enrollment, and celebratory confetti.
- **Student Dashboard (`/dashboard`)**:
  - Enrolled courses with interactive progress tracking
  - Verifiable digital certificates with PDF download
  - Real-time internship application status tracking
  - Complete order history and tax invoices
  - Referral earnings & custom referral link generator
- **Admin Control Portal (`/admin`)**:
  - Real-time gross revenue, user count, course count, and lead metrics
  - Course CRUD: Add, edit, delete, adjust pricing, and toggle publication
  - Student & User Directory: Manage user roles (Admin vs Student)
  - Internship Applications Reviewer: Accept / Review / Reject candidates
  - Contact & Lead Inquiries Inbox
  - Blog & Editorial Publisher
- **Placement & Career Showcase (`/placements`)**: Verified salary packages, recruitment partners (Microsoft, Amazon, Deloitte, Swiggy, Oracle), and student alumni stories.
- **Verifiable Certification System (`/verify-certificate`)**: Cryptographic certificate ID lookup system with verifiable credentials.
- **Refer & Earn Program (`/refer-and-earn`)**: ₹500 reward system per enrolled friend with interactive earnings calculator.
- **Industry Internship Program (`/internships`)**: 6 flagship tracks with step-by-step application submission.

---

## 🔐 Default Demo Accounts

| Role | Email | Password | Access |
|---|---|---|---|
| **Administrator** | `admin@coursedivine.com` | `Admin@123` | Full Admin Operations Portal (`/admin`) |
| **Student** | `student@coursedivine.com` | `Student@123` | Student Dashboard (`/dashboard`) |

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, React Router DOM v6, Axios, Canvas Confetti
- **Backend**: Node.js, Express.js, JWT, bcryptjs, Helmet, Rate Limiter, Morgan, Razorpay SDK
- **Database**: MongoDB & Mongoose schemas with built-in resilience and fallback data store

---

## 🚀 Running the Project

### 1. Start the Backend API Server
```bash
cd server
npm install
npm start
```
*API runs at `http://localhost:5000` (Health check at `http://localhost:5000/api/health`)*

### 2. Start the Frontend React Client
```bash
cd client
npm install
npm run dev
```
*Frontend runs at `http://localhost:5173`*

---

## 📄 License & Ownership
Copyright © 2026 **Course Divine**. All Rights Reserved.
