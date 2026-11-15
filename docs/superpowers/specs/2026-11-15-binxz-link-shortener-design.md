# Design: Binxz Link Shortener

A custom URL shortener with "binxz.grafis" branding and QR code generation.

## Intent
Create a personal tool for the user to transform long URLs into branded short links with a specific watermark and generate branded QR codes.

## Goals
- Input any URL (Drive, Web, etc.).
- Generate a custom slug containing `binxz-grafis`.
- Display a QR code for the shortened link with a "binxz" logo.
- Persistent storage for links (they don't expire).
- Hosted for free without subscription.

## Non-Goals
- Multi-user support (private use only).
- Advanced analytics (beyond basic hit counts).
- Custom top-level domain (using free subdomains like `.vercel.app`).

## Constraints
- Must be free to host.
- Must be easy to deploy.

## Approaches
1. **Next.js + Supabase (Chosen)**:
   - *Pros*: Scalable, free tier is generous, built-in API routes, Supabase handles database and auth easily.
   - *Cons*: Requires setting up two free accounts (Vercel and Supabase).
2. **Static Site + External Shortener API**:
   - *Pros*: No database setup.
   - *Cons*: Limited control over slugs, depends on 3rd party reliability, difficult to brand properly.

## Technical Details
- **Framework**: Next.js (App Router).
- **Styling**: Tailwind CSS.
- **Database**: Supabase (PostgreSQL) to store mapping: `id | slug | original_url | created_at`.
- **QR Generation**: `qrcode.react` with image overlay.
- **Watermark logic**: Slugs will be formatted as `binxz-grafis-[random_suffix]`.

## Deployment
- Frontend/API: Vercel.
- Database: Supabase.

## What's left to the builder
- Designing the landing page UI (clean, similar to urlshort.dev).
- Implementing the redirection logic (`/[slug]`).
- QR code logo positioning.
- Setup instructions for the user.
