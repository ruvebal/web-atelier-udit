---
layout: lesson
title: 'Deployment: Shipping to the World'
slug: react-deployment
category: react
tags: [react, deployment, vercel, cicd, github-actions]
week: 12
phase: 4
sprint: 13
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/react/react-deployment/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

> *"Code that isn't deployed doesn't exist. Ship it."*

---

## 🎯 Sprint Goal

**By the end of this sprint**: Your app is live on the internet, automatically deployed on every push, with environment variables properly configured and a custom domain (optional).

---

## 📍 Position in Journey

| Sprint | Focus | Your App Grows |
|--------|-------|----------------|
| 11. Testing | Quality | Reliable codebase |
| 12. Performance | Speed | Optimized experience |
| **→ 13. Deployment** | Launch | Live on the web |
| 14. Presentation | Demo | Showcase your work |

---

## 🧭 Learning Objectives

By the end of this lesson, you will:

- [ ] Build a production-ready bundle with Vite
- [ ] Deploy to Vercel (or Netlify) from GitHub
- [ ] Configure environment variables securely
- [ ] Set up automatic deployments on push
- [ ] Configure preview deployments for PRs
- [ ] (Optional) Connect a custom domain

---

## 🏗️ Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│               YOUR DEPLOYMENT PIPELINE                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   [GitHub Repository]                                    │
│          │                                               │
│          ├──► Push to main ──► Production Deploy         │
│          │                                               │
│          └──► Pull Request ──► Preview Deploy            │
│                                                          │
│   [Vercel/Netlify]                                       │
│          │                                               │
│          ├──► Build (npm run build)                      │
│          ├──► Test (optional: npm run test)              │
│          └──► Deploy to CDN edge network                 │
│                                                          │
│   [Your App] ← Live at myapp.vercel.app                  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 Backend Connections

| Your Backend | Deployment Considerations |
|--------------|--------------------------|
| **Laravel API** | Set `VITE_API_URL` to production API URL |
| **Hygraph CMS** | Add `VITE_HYGRAPH_URL` and auth token |
| **Firebase** | Configure Firebase project for production |

### Environment Variables

```bash
# .env.local (development - NOT committed)
VITE_API_URL=http://localhost:8000/api
VITE_HYGRAPH_URL=https://api-us-west.hygraph.com/v2/xxx/master

# Vercel Dashboard (production - secure)
VITE_API_URL=https://api.yourapp.com
VITE_HYGRAPH_URL=https://api-us-west.hygraph.com/v2/xxx/master
```

**⚠️ Important**: `VITE_` prefix = exposed to browser. Never put secrets here!

---

## 🎓 Methodology: Atelier Practice

### The Sprint Rhythm

```
┌─────────────────────────────────────────────────────────┐
│ DAY 1: First Deployment                                 │
│   • Build locally: npm run build                        │
│   • Connect GitHub repo to Vercel                       │
│   • Deploy! See your app live for the first time        │
├─────────────────────────────────────────────────────────┤
│ DAY 2: Environment & CI                                 │
│   • Configure environment variables in Vercel           │
│   • Set up GitHub Actions for tests before deploy       │
│   • Test preview deployments on a PR                    │
├─────────────────────────────────────────────────────────┤
│ DAY 3: Polish & Share                                   │
│   • Fix any production-only bugs                        │
│   • Add professional README with live link              │
│   • Share with classmates, gather feedback              │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 Deployment Checklist

### Before Deploying

- [ ] All tests pass locally
- [ ] Build succeeds: `npm run build`
- [ ] No console errors in production build
- [ ] Environment variables documented
- [ ] Sensitive data NOT in code or public env vars

### After Deploying

- [ ] App loads correctly at production URL
- [ ] All routes work (test deep links)
- [ ] API calls reach correct backend
- [ ] Auth flow works in production
- [ ] Lighthouse score acceptable

---

### AI-Assisted Development Protocol

| Task | AI Role | Your Role |
|------|---------|-----------|
| Debug build errors | Explain the error | Fix and retry |
| Configure env vars | Show best practices | Apply to your project |
| Write GitHub Actions | Draft workflow file | Customize for your stack |
| Fix production bugs | Suggest common causes | Debug and deploy fix |

---

## 📝 Sprint Deliverables

- [ ] **Live URL** for your app (e.g., yourapp.vercel.app)
- [ ] **Automatic deploys** on push to main
- [ ] **Preview deploys** enabled for PRs
- [ ] **Environment variables** configured properly
- [ ] **GitHub Actions** running tests before deploy
- [ ] **README** with live link and deploy status badge
- [ ] **Reflection**: What did you learn about production?

---

## 🛠️ Quick Deployment Guide

### Vercel (Recommended)

```bash
# 1. Install Vercel CLI (optional)
npm i -g vercel

# 2. Deploy from CLI
vercel

# Or: Connect via dashboard
# → vercel.com → Import Git Repository → Select repo → Deploy
```

### Netlify (Alternative)

```bash
# 1. Install Netlify CLI (optional)
npm i -g netlify-cli

# 2. Deploy from CLI
netlify deploy --prod

# Or: Connect via dashboard
# → app.netlify.com → Add new site → Import from Git
```

---

## 🔗 Lesson Navigation

| Previous | Current | Next |
|----------|---------|------|
| [Performance](../react-performance/) | **Deployment** | [Final Presentation](../final-presentation/) |

---

## 📚 Key Concepts Preview

### Shipping is a discipline (not a button)

- **Build artifacts** are different from source code.
- **Environments** (dev/staging/prod) must be separated.
- **Secrets** must never be committed.
- **Rollback** is part of “done”.

### Deployment baseline (student projects)

- Production build (`vite build`)
- Hosted on Vercel/Netlify (or equivalent)
- Environment variables configured
- One CI check (lint/typecheck/tests) before “green deploy”

### Reflection (Atelier)

> 💭 _What failed only after deployment (CORS, env vars, base paths, caching)?_

> 💭 _What “invisible work” did you underestimate (docs, secrets, CI)?_

### Koan

> _"If it only runs on your laptop, it does not yet run."_

---

> *"Deploy early, deploy often. Every deployment teaches you something new."*
