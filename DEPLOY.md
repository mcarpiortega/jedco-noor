# JEDCO NOOR — Deployment Guide

## Project structure

```
jedco-noor/
├── package.json          ← dependencies (React 18, Router, Tabler Icons)
├── vite.config.js        ← Vite build config
├── index.html            ← HTML entry point
├── .gitignore
├── public/
│   ├── _redirects        ← Lovable/Netlify SPA routing
│   └── noor-icon.svg
└── src/
    ├── main.jsx          ← React root
    ├── App.jsx           ← Router + layout
    ├── index.css         ← Design system (CSS vars, dark theme)
    ├── components/
    │   └── Sidebar.jsx   ← Navigation sidebar
    └── pages/
        ├── Dashboard.jsx
        ├── Occupancy.jsx
        ├── Pricing.jsx
        ├── Products.jsx  ← includes drill-down tabs
        ├── Incidents.jsx
        ├── Simulator.jsx ← split-pane workspace
        ├── Reports.jsx
        └── Settings.jsx
```

---

## Step 1 — Create GitHub repository

1. Go to https://github.com and sign in
2. Click the **+** icon → **New repository**
3. Repository name: `jedco-noor`
4. Keep it **Public** (required for free Lovable)
5. Do NOT initialize with README
6. Click **Create repository**

---

## Step 2 — Upload the files to GitHub

### Option A — Drag & drop (easiest)

1. Open the `jedco-noor` folder on your computer
2. In GitHub, click **uploading an existing file** (on the empty repo page)
3. Drag the entire contents of the `jedco-noor` folder into the GitHub uploader
4. Important: **maintain the folder structure** — drag folders (src/, public/) not just files
5. Add commit message: `Initial commit — JEDCO NOOR UI`
6. Click **Commit changes**

### Option B — Git CLI (if installed)

```bash
cd "path/to/jedco-noor"
git init
git add .
git commit -m "Initial commit — JEDCO NOOR UI"
git remote add origin https://github.com/YOUR_USERNAME/jedco-noor.git
git branch -M main
git push -u origin main
```

---

## Step 3 — Connect to Lovable and deploy

1. Go to https://lovable.dev and sign in / create account
2. Click **New project** → **Import from GitHub**
3. Authorize Lovable to access your GitHub account
4. Select the `jedco-noor` repository
5. Framework should auto-detect as **Vite**
6. Build command: `npm run build`
7. Output directory: `dist`
8. Click **Import and Deploy**

Lovable will:
- Install npm dependencies (React, Router, Tabler Icons)
- Run `vite build`
- Deploy to a public URL like `https://jedco-noor.lovable.app`

---

## Step 4 — Publish

Once deployed, click **Publish** in Lovable's top bar to make the URL shareable.

You can also connect a custom domain in Lovable → Settings → Custom Domain.

---

## Local development (optional)

```bash
cd jedco-noor
npm install
npm run dev
```

Opens at http://localhost:5173

---

## Screens included

| Screen | Route | Status |
|---|---|---|
| Dashboard | `/dashboard` | ✅ Complete |
| Occupancy | `/occupancy` | ✅ Complete |
| Pricing | `/pricing` | ✅ Complete |
| Products | `/products` | ✅ Complete (with 5 drill-down tabs) |
| Incidents | `/incidents` | ✅ Complete |
| Simulator | `/simulator` | ✅ Complete (split-pane workspace) |
| Reports | `/reports` | ✅ Complete |
| Settings | `/settings` | ✅ Complete (5 sections) |
