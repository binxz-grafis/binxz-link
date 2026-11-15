# Binxz Link Shortener Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a personal URL shortener with branded slugs, QR code logo, and dark Porto Binxz theme.

**Architecture:** Next.js App Router for frontend/API, Supabase for PostgreSQL storage, and client-side QR generation.

**Tech Stack:** Next.js, Tailwind CSS, Supabase, `qrcode.react`, `lucide-react`.

**Spec:** `docs/superpowers/specs/2026-11-15-binxz-link-shortener-design.md`

## Global Constraints
- Branding: Slugs must start with `binxz-grafis-`.
- Theme: Dark mode with pink (`#ec4899`) and lime (`#a3e635`) accents.
- Logo: Use `watermark binxz hitam.png` in QR code center.

## Review Focus
- Invalid URL input: Should show clear error message, not crash.
- Duplicate slug: Database should handle collisions or logic should retry.
- Missing DB env vars: App should fail gracefully with setup instructions.
- QR Code readability: Logo size shouldn't break the scanability.
- Redirect performance: Redirection should be fast (edge function if possible).

---

### Task 1: Project Setup & Supabase Schema

**Files:**
- Create: `supabase/schema.sql`, `.env.local`, `lib/supabase.ts`
- Modify: `package.json`

- [ ] **Step 1: Define Supabase schema**
Create a table `links` with columns: `id (uuid)`, `slug (text, unique)`, `original_url (text)`, `created_at (timestamp)`.

- [ ] **Step 2: Initialize Next.js project and install dependencies**
Run: `npx create-next-app@latest . --typescript --tailwind --eslint`
Install: `npm install @supabase/supabase-js qrcode.react lucide-react clsx tailwind-merge`

- [ ] **Step 3: Setup Supabase client**
Implement `lib/supabase.ts` using `process.env.NEXT_PUBLIC_SUPABASE_URL` and `process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY`.

---

### Task 2: UI Implementation (Landing Page)

**Files:**
- Create: `app/page.tsx`, `components/QRCodeGenerator.tsx`, `components/Header.tsx`
- Modify: `app/globals.css`, `tailwind.config.ts`

- [ ] **Step 1: Configure Tailwind colors**
Add `porto-pink: '#ec4899'` and `porto-lime: '#a3e635'` to `tailwind.config.ts`.

- [ ] **Step 2: Build Header and Hero**
Implement the dark theme header and "SHORTEN LINKS" title as per mockup.

- [ ] **Step 3: Build Input form**
Create a stateful form with an input field and a "Shorten" button with the pink gradient.

---

### Task 3: API Logic & Shortening

**Files:**
- Create: `app/api/shorten/route.ts`

- [ ] **Step 1: Implement Shorten API**
Endpoint `POST /api/shorten` that:
1. Validates URL.
2. Generates slug: `binxz-grafis-` + 5 random chars.
3. Saves to Supabase.
4. Returns the short URL.

---

### Task 4: Redirection Logic

**Files:**
- Create: `app/[slug]/page.tsx`

- [ ] **Step 2: Implement dynamic route for redirect**
Create `app/[slug]/page.tsx` that fetches the `original_url` from Supabase by `slug` and uses `redirect(original_url)`.

---

### Task 5: QR Code with Logo

**Files:**
- Modify: `components/QRCodeGenerator.tsx`

- [ ] **Step 1: Implement QR Code component**
Use `QRCodeCanvas` from `qrcode.react`.
Include an image overlay using the `watermark binxz hitam.png` logo.
Ensure the logo is inside a white circle (`excavate: true`).

---

### Task 6: Deployment & Final Polish

- [ ] **Step 1: Add error handling**
Show toast or alert if URL is invalid or DB is down.

- [ ] **Step 2: Deployment documentation**
Write `README.md` with Vercel deployment steps (adding env vars).
