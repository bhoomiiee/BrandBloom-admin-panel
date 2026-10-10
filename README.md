# 🌸 BrandBloom — Admin Panel

BrandBloom is a SaaS platform designed to help small businesses launch, manage, and scale their online stores. It provides merchant telemetry, automated performance monitoring, and intelligent recommendations to systematically diagnose bottlenecks and improve website conversion rates.

---

## 🎨 Branding & Colour Palette

BrandBloom's user interface strictly implements our cohesive brand design system:
- **Marine Blue (`#01386A`)**: Primary brand color, sidebar navigation, top brand motifs, and high-emphasis controls.
- **Bright Red (`#EE4B2B`)**: Critical indicators, declining sales alerts, high-priority issues, and destructive action buttons.
- **Butter Yellow (`#FFFD74`)**: Statistics highlights, telemetry tags, and active status indicators.
- **Supporting Palette**: Pure White (`#FFFFFF`), Soft Background (`#F7F9FC`), Crisp Dark Text (`#102A43`), Muted Slate (`#64748B`), and Clean Borders (`#E2E8F0`).

---

## 🏗️ Project Structure

The project maintains a clean separation between the frontend client and the backend REST API:

```
BrandBloom/
├── backend/
│   ├── src/
│   │   ├── config/          # Environment & brand configuration
│   │   ├── controllers/     # API route controllers (stores, recs, upgrades, analytics, etc.)
│   │   ├── middleware/      # Error handler, request logger, CORS
│   │   ├── models/          # In-memory data store with search, filters, and stats
│   │   ├── routes/          # Express REST routers (/api/...)
│   │   ├── services/        # AI Optima-v2 diagnostic engine
│   │   ├── utils/           # Structured logger & rich merchant seed data
│   │   └── server.js        # Express app entrypoint
│   ├── package.json
│   ├── .env.example
│   └── .env
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable UI widgets, KPI cards, modals, SVG charts
│   │   ├── layouts/         # AdminLayout with Marine Blue sidebar & sticky topbar
│   │   ├── pages/           # Dashboard, Stores, AI Recs, Upgrades, Analytics, Logs, Settings
│   │   ├── services/        # API client modules with error handling & proxy support
│   │   ├── styles/          # Design system CSS with tokens, responsive media queries
│   │   ├── App.jsx          # Root application component with state orchestration
│   │   └── main.jsx         # React DOM entrypoint
│   ├── index.html           # BrandBloom metadata, Google Fonts, SVG favicon
│   ├── vite.config.js       # Vite configuration with reverse proxy to port 5000
│   ├── package.json
│   ├── .env.example
│   └── .env
├── docs/
│   ├── ARCHITECTURE.md      # Detailed system architecture & workflow design
│   └── API_DOCUMENTATION.md # REST API endpoint reference
├── package.json             # Root project scripts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended, tested on Node v24)
- npm (v9 or higher)

### 1. Backend Setup & Startup
In a terminal:
```bash
cd backend
npm install
npm run start
# Server starts on http://localhost:5000
# Health check: http://localhost:5000/api/health
```

### 2. Frontend Setup & Startup
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
# Frontend Vite dev server starts on http://localhost:5173
```

Open `http://localhost:5173` in your browser. The Vite development server automatically proxies all `/api` requests to the backend server running on port 5000.

---

## 🔄 Core Workflow: Owner-Approved Website Improvements

BrandBloom adheres to a strict policy: **Storefront modifications require verified merchant owner approval prior to deployment.**

1. **Telemetry & Diagnostics**: The AI Optima-v2 engine audits store metrics (bounce rate > 55%, conversion rate < 1.8%, revenue trend).
2. **AI Recommendation Generated**: A concrete improvement is prepared with problem diagnostics, supporting evidence, and projected uplift.
3. **Dispatch to Merchant Owner**: Admin reviews the recommendation and pushes it to the store owner as a Website Upgrade Request.
4. **Owner Decision Gate**: The store owner reviews the proposal in their merchant portal and submits **Approval** or **Rejection** with feedback notes.
5. **Interactive Preview & Sandbox**: Admin reviews the Before vs After visual comparison, test-drives the interactive storefront mockup, and inspects the code diff.
6. **Authorization Check & Deployment**:
   - If owner approval is **NOT Approved**, the deployment action is strictly blocked by backend security guards.
   - If owner approval is **Approved**, Admin deploys the upgrade to the merchant storefront via the automated deployment engine.
7. **Rollback Safety**: Every deployed upgrade stores a pre-release snapshot allowing 1-click instant rollback.

---

## 🌟 Key Features

1. **Executive Dashboard**: Aggregate GMV revenue, active vs declining store counts, pending AI suggestions, sales trend SVG curves, and real-time event feeds.
2. **Store Management**: Full merchant table with search, category filtering, status updates (Active, Inactive, Suspended, Declining), and on-demand AI scan triggers.
3. **AI Recommendations Hub**: Prioritized bottlenecks, data-backed evidence, impact scores (out of 100), and one-click dispatching to merchant owners.
4. **Website Upgrade Pipeline**: Clear separation of Owner Approval Status (`Pending Approval`, `Approved`, `Rejected`) and Implementation Status (`Pending Approval`, `Approved`, `In Progress`, `Completed`, `Failed`). Features interactive sandbox mockup, simulated live deployment terminal, and instant rollback.
5. **Analytics & Intelligence**: Revenue trajectory timeseries, category breakdown, store health distributions, recommendation acceptance rate, and exportable JSON reports.
6. **Notifications & Audit Trail**: Real-time alert notifications with unread counts and a complete system activity audit trail recording every actor action.
7. **Platform Settings**: Configurable AI sensitivity thresholds, scan frequency, and mandatory authorization guards.

---

## ⚠️ Simulation Environment Notice

The live application features a fully functional simulation engine. In accordance with platform integrity guidelines, simulated store data and sandbox previews are clearly labeled throughout the interface. Live storefront injections simulate the end-to-end CI/CD and CDN delivery pipeline in safe sandbox isolation.
