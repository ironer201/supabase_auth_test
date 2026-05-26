# Supabase Authentication & Profile Dashboard

> A full‑stack **Auth + CRUD** frontend application built with vanilla JavaScript and Supabase.  
> Demonstrates production‑grade authentication flows, session management, and real‑time profile management — all served as a static SPA.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔐 **Email/Password Auth** | Sign up & login via Supabase Auth with secure password handling |
| 📋 **Profile Auto‑Provisioning** | First‑login automatically creates a blank profile row in the database |
| 👁️ **View / Edit Profiles** | Toggle between read‑only and editable profile views with smooth CSS transitions |
| 💾 **Upsert Data Persistence** | Save changes with **upsert** — inserts if new, updates if existing |
| 🚪 **Session & Logout** | Secure sign‑out with `localStorage` email tracking |
| 🎨 **Animated Background** | Interactive particle canvas using FinisherHeader for a modern UI feel |
| 📱 **Floating‑Label Forms** | Accessible, animated input labels on the auth page |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────┐
│                  Frontend (SPA)                  │
│                                                  │
│  index.html ─── style.css ─── script.js          │
│       │                                          │
│       ├── signup form → supabase.auth.signUp()   │
│       └── login form → supabase.auth.signInWith  │
│                         Password()               │
│                        → insert profile row      │
│                        → redirect to dashboard   │
│                                                  │
│  dashboard.html ─ dashboard.css ─ dashboard.js   │
│       │                                          │
│       ├── loadProfile() → SELECT from auth table │
│       └── saveProfileBtn → UPSERT into auth table│
│                                                  │
│  supabaseClient.js ─── shared Supabase instance  │
│                                                  │
│        │  (ES Modules — no bundler required)     │
└──────────────┬──────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────┐
│              Supabase Backend                     │
│  ┌──────────┐   ┌──────────────────────────┐    │
│  │   Auth   │   │  Database (auth table)    │    │
│  │  Service │   │  Email (PK), Name, Phone, │    │
│  │          │   │  PresentAddress,           │    │
│  │ signUp / │   │  PermanentAddress, Gender, │    │
│  │ signIn   │   │  Nationality              │    │
│  └──────────┘   └──────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

### Key Design Decisions

- **No framework / bundler** — pure ES modules for zero‑overhead, instant load
- **Upsert strategy** — uses `onConflict: 'Email'` to avoid duplicate rows on repeated saves
- **Floating label pattern** — pure CSS (no JS) animated form labels for clean UX
- **CSS sliding panels** — profile view/edit sections use `left` + `opacity` transitions for smooth navigation

---

## 🧑‍💻 Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5 + CSS3** | Semantic markup, responsive layout, animated UI |
| **Vanilla JavaScript (ES Modules)** | Client‑side logic, no framework overhead |
| **Supabase** | BaaS — Auth & PostgreSQL database |
| **FinisherHeader** | Canvas‑based interactive particle background |
| **Font Awesome** | Icon library (logout button) |

---

## 🚀 Getting Started

### Prerequisites

- A [Supabase](https://supabase.com) project
- Node.js (for installing the Supabase client — or use ESM CDN)

### Setup

1. **Clone the project**
   ```bash
   git clone <your-repo-url>
   cd Supabase_authentiton_for_user
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Supabase credentials**  
   Edit `supabaseClient.js`:
   ```js
   const SUPABASE_URL = "https://your-project.supabase.co";
   const supabaseAnonKey = "your-anon-key";
   ```

4. **Create the database table**  
   Run this SQL in your Supabase SQL editor:
   ```sql
   CREATE TABLE auth (
     "Email"            TEXT PRIMARY KEY,
     "Name"             TEXT,
     "Phone"            TEXT,
     "PresentAddress"   TEXT,
     "PermanentAddress" TEXT,
     "Gender"           TEXT,
     "Nationality"      TEXT
   );
   ```

5. **Serve**  
   Open `index.html` in any browser. No build step required.

---

## 📁 Project Structure

```
├── index.html          Auth page (sign up / login forms)
├── style.css           Auth page styles + animated background
├── script.js           Auth logic + profile row creation
├── dashboard.html      Profile dashboard (view / edit)
├── dashboard.css       Dashboard layout + slide animations
├── dashboard.js        Profile CRUD operations
├── supabaseClient.js   Supabase client singleton
├── finisher-header.es5.min.js   Particle animation library
├── package.json        Dependency metadata
└── README.md           This file
```

---

## 🔄 Data Flow

```
User signs up → Supabase Auth creates user
       │
User logs in → Supabase Auth validates credentials
       │
       ├── Profile row exists? → YES → Load profile data
       └── Profile row exists? → NO  → Insert blank row
       │
       ▼
Redirect to dashboard → SELECT * FROM auth WHERE Email = ?
       │
User edits fields → Save button → UPSERT into auth table
       │
       ▼
View section updates with new values (optimistic UI)
```

---

## 🧪 Possible Enhancements

- Add **Row‑Level Security (RLS)** policies for per‑user data isolation
- Implement **email verification** flow
- Add **client‑side validation** for profile fields
- Switch to a **framework** (React / Vue) for component reuse
- Add **loading skeletons** and **error boundaries**
- Integrate **OAuth providers** (Google, GitHub)

---

## 📄 License

This project is provided as a portfolio piece. No license specified — use freely for learning and demonstration purposes.
