# BrandBloom REST API Documentation

Base URL: `http://localhost:5000/api`

## Health & System
- `GET /health` — Returns system uptime and API status.

## Store Management
- `GET /stores` — List all registered merchant stores (supports `search`, `status`, `category`, `sortBy`).
- `GET /stores/stats` — Aggregate metrics (total stores, active count, declining count, total revenue, average health score).
- `GET /stores/:id` — Retrieve single store details and telemetry.
- `POST /stores` — Register a new merchant store.
  - Body: `{ name, ownerName, ownerEmail, category, plan, url }`
- `PATCH /stores/:id/status` — Modify store operational status (`active`, `declining`, `inactive`, `suspended`).
- `PUT /stores/:id` — Update store details.

## AI Recommendations
- `GET /recommendations` — List AI suggestions (supports filters: `storeId`, `priority`, `status`, `category`, `search`).
- `GET /recommendations/stats` — Recommendation metrics (total, pending, pushed, implemented).
- `GET /recommendations/:id` — Detailed suggestion metrics and bottleneck diagnostics.
- `POST /recommendations/generate` — Trigger on-demand AI scan for a store.
  - Body: `{ storeId }`
- `PATCH /recommendations/:id/status` — Update status (`pending`, `reviewed`, `dismissed`).
- `POST /recommendations/:id/push-to-owner` — Dispatch proposal to store owner (creates linked Website Upgrade Request).

## Website Upgrade Requests (Core Workflow)
- `GET /upgrades` — List all proposed website improvements with owner approval and implementation statuses.
- `GET /upgrades/stats` — Stats on pending approval, approved, in-progress, completed, rejected.
- `GET /upgrades/:id` — Single upgrade with before/after previews, code diffs, and audit logs.
- `PATCH /upgrades/:id/owner-decision` — Record or simulate merchant owner response.
  - Body: `{ decision: "Approved" | "Rejected", notes: "string" }`
- `POST /upgrades/:id/apply` — Deploy upgrade to storefront (enforces owner approval check).
- `POST /upgrades/:id/rollback` — Revert storefront changes to pre-upgrade snapshot.
  - Body: `{ reason: "string" }`

## Analytics & Intelligence
- `GET /analytics/overview` — Platform sales timeseries, category breakdown, registration trajectory, and upgrade efficiency.

## Notifications & Activity Logs
- `GET /notifications` — List system alerts and owner responses with unread count.
- `PATCH /notifications/:id/read` — Mark notification as read.
- `POST /notifications/mark-all-read` — Mark all notifications as read.
- `GET /notifications/activity-logs` — Audit trail records of all system and admin actions.

## Platform Settings
- `GET /settings` — Get AI engine parameters and authorization guard configurations.
- `PUT /settings` — Update platform settings.
