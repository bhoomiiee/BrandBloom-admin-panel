# BrandBloom Admin Panel — Architecture Specification

## 1. Executive Summary

BrandBloom is an intelligent e-commerce enablement platform empowering small businesses to launch, monitor, and optimize their online stores. The BrandBloom Admin Panel provides administrators and operators with a bird's-eye view over registered merchants, automated AI diagnostic scans, and an owner-governed website improvement workflow.

## 2. Core Architectural Pillars

### 2.1 Owner-Approved Website Improvements (The Core Workflow)
A core differentiator of BrandBloom is its governance model for storefront updates:
```
[ Telemetry & Metrics ]
         │
         ▼
[ AI Optima-v2 Diagnostics ] ──> Detects Bottlenecks (e.g. 74.2% Cart Abandonment)
         │
         ▼
[ AI Recommendation Created ] ──> Priority, Impact Score, Evidence
         │
         ▼
[ Proposal Dispatched to Merchant Owner ] ──> Creates Website Upgrade Request
         │
         ▼
[ Owner Decision Gate ] ──> Owner Approves or Rejects with Feedback
         │
    ┌────┴───────────────────────────┐
    ▼                                ▼
[ Rejected ]                    [ Approved ]
  Status: Rejected                Status: Approved
  No store modification           Ready for Deployment
                                     │
                                     ▼
                                [ Live Verification & Build ]
                                     │
                                     ▼
                                [ Deploy to Storefront ]
                                  Status: Completed
                                  Snapshot Stored for 1-Click Rollback
```

### 2.2 Strict Status Separation
The system maintains strict architectural separation between:
1. **Recommendation Status**: `pending`, `reviewed`, `pushed_to_owner`, `implemented`, `dismissed`.
2. **Owner Approval Status**: `Pending Approval`, `Approved`, `Rejected`.
3. **Implementation Status**: `Pending Approval`, `Approved`, `In Progress`, `Completed`, `Rejected`, `Failed`, `Rolled Back`.

### 2.3 Security & Simulation Sandbox
- BrandBloom strictly prevents unauthorized code deployment: if `ownerApprovalStatus !== 'Approved'`, backend controllers reject deployment with HTTP 403.
- The storefront upgrade pipeline operates inside a verified simulation sandbox environment, displaying side-by-side interactive previews, AST code diffs, and live mockups without endangering merchant live traffic.

## 3. Brand Identity & Design System

- **Marine Blue (`#01386A`)**: Primary brand identity, sidebar navigation, headers, and major focus points.
- **Bright Red (`#EE4B2B`)**: Critical alerts, declining sales indicators, urgent priority badges, and destructive actions.
- **Butter Yellow (`#FFFD74`)**: Key statistics, highlights, and simulation status indicators.
- **Background (`#F7F9FC`)**, **White (`#FFFFFF`)**, **Text (`#102A43`)**, **Borders (`#E2E8F0`)**.

## 4. Technology Stack

- **Frontend**: React 18, Vite, Lucide Icons, Pure CSS Design System with custom properties, SVG Chart components.
- **Backend**: Node.js (ES Modules), Express.js REST API, modular controllers, models, and services.
- **Integration**: Clean service layers with environment-driven endpoints (`/api/...`) and Vite reverse proxy.
