# BrandBloom Production Deployment Guide

This guide walks you through deploying the BrandBloom Admin Panel to production across three popular environments:
1. **Option A (Recommended & Fastest)**: **Vercel** (Frontend) + **Render** (Backend)
2. **Option B (One-Click Blueprint)**: **Render Blueprint** (`render.yaml`)
3. **Option C (Containerized)**: **Docker & Docker Compose** (Self-hosted VPS / AWS / DigitalOcean)

---

## Pre-Deployment Checklist

Before deploying, ensure you have:
1. **MongoDB Atlas Cluster**: Your cluster URI from `backend/.env`:
   ```
   mongodb+srv://<username>:<password>@cluster0.avrkpib.mongodb.net/brandbloom?retryWrites=true&w=majority&appName=Cluster0
   ```
2. **Atlas Network Access**: Ensure MongoDB Atlas has `0.0.0.0/0` (Allow Access from Anywhere) enabled under **Network Access** so cloud hosting platforms (Vercel/Render/Railway) can connect without IP restrictions.
3. **GitHub Repository**: Push this project to a GitHub repository (e.g. `github.com/your-username/BrandBloom-admin-panel`).

---

## Option A: Vercel (Frontend) + Render (Backend)

This is the most cost-effective and responsive production setup (free tiers available on both platforms).

### Step 1: Deploy Backend to Render

1. Log in to [Render](https://render.com/).
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository.
4. Configure the service:
   - **Name**: `brandbloom-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Scroll down to **Environment Variables** and add:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
   - `AI_MODEL_VERSION` = `brandbloom-optima-v2`
   - `MONGODB_URI` = *(your full MongoDB Atlas URI)*
6. Click **Deploy Web Service**.
7. Once deployed, note down your backend URL (e.g., `https://brandbloom-backend-xxxx.onrender.com`).
8. Verify it works by opening `https://brandbloom-backend-xxxx.onrender.com/api/health` in your browser.

---

### Step 2: Deploy Frontend to Vercel

1. Log in to [Vercel](https://vercel.com/).
2. Click **Add New…** → **Project**.
3. Import your GitHub repository.
4. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click `Edit` and select `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Expand **Environment Variables** and add:
   - `VITE_API_BASE_URL` = `https://brandbloom-backend-xxxx.onrender.com/api` (use your Render backend URL from Step 1, including `/api`)
   - `VITE_APP_NAME` = `BrandBloom`
6. Click **Deploy**.
7. [vercel.json](file:///c:/Users/dell/OneDrive/문서/BrandBloom-admin-panel/frontend/vercel.json) will automatically handle SPA routing rewrites.

---

### Step 3: Link Client URL in Backend (CORS)

In Render, add or update the `CLIENT_URL` environment variable with your Vercel domain:
- `CLIENT_URL` = `https://your-brandbloom-frontend.vercel.app`

---

## Option B: Render Blueprint (`render.yaml`)

You can deploy both services together using Render's Infrastructure-as-Code Blueprint:

1. Push your repository to GitHub.
2. Log in to [Render](https://render.com/).
3. In the dashboard, click **Blueprints** → **New Blueprint Instance**.
4. Select your repository.
5. Render reads [render.yaml](file:///c:/Users/dell/OneDrive/문서/BrandBloom-admin-panel/render.yaml) and creates:
   - `brandbloom-backend` (Node Web Service)
   - `brandbloom-frontend` (Static Site)
6. When prompted, enter your `MONGODB_URI` secret.
7. Click **Apply**. Both services will build and link automatically.

---

## Option C: Docker & Docker Compose (Self-Hosted / VPS)

For deploying on your own server (Ubuntu / Debian / DigitalOcean Droplet / AWS EC2):

### 1. Install Docker & Docker Compose
```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-plugin
```

### 2. Clone Repository & Set Environment
```bash
git clone https://github.com/your-username/BrandBloom-admin-panel.git
cd BrandBloom-admin-panel
```

Create a `.env` file at the root:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.avrkpib.mongodb.net/brandbloom?retryWrites=true&w=majority&appName=Cluster0
```

### 3. Build & Run
```bash
docker compose up -d --build
```

### 4. Verify Containers
```bash
docker compose ps
```
- Frontend will be served on port `80` (HTTP).
- Backend will be available on port `5000` (`http://<server-ip>:5000/api/health`).

---

## Production Health & Monitoring

| Service | Endpoint | Expected Response |
| :--- | :--- | :--- |
| **Backend Health** | `GET /api/health` | `{"status":"healthy","name":"BrandBloom Admin Panel API","version":"1.0.0"}` |
| **Stores Endpoint** | `GET /api/stores` | `{"success":true,"data":[...],"count":10}` |
| **Analytics Overview** | `GET /api/analytics/overview` | Live category distribution and dynamic KPIs |

---

## Security Best Practices for Production

1. **Never Commit Secrets**: Ensure `.env` is listed in `.gitignore` (already configured).
2. **MongoDB Access Control**: Use dedicated database users with `readWrite` permission restricted to the `brandbloom` database.
3. **CORS Restrictions**: Set `CLIENT_URL` in production backend environment variables to your exact frontend domain instead of `*`.
4. **Rate Limiting**: For public production traffic, consider adding `express-rate-limit` to prevent abuse.
