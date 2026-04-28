# Newsletter Admin Guide

## Overview

The newsletter system lets visitors subscribe to the Gravy Train via the landing page, stores subscribers in your own Turso database, and sends email notifications via Resend when you publish new posts. You own all subscriber data and can export or delete it at any time.

---

## First-Time Setup

### 1. Create a Turso account and database

```bash
# Install the Turso CLI
brew install tursodatabase/tap/turso

# Log in
turso auth login

# Create a database
turso db create gravy-train

# Get the connection URL
turso db show gravy-train --url
# → libsql://gravy-train-<your-username>.turso.io

# Create an auth token
turso db tokens create gravy-train
# → eyJh...
```

### 2. Create a Resend account

1. Go to [resend.com](https://resend.com) and sign up (free, no credit card required for the free tier).
2. Go to **Domains** and add your domain. Follow the DNS instructions to verify it. This is required to send from `you@yourdomain.com`.
   - Until your domain is verified, you can only send to your own email using the `onboarding@resend.dev` sandbox address.
3. Go to **API Keys** and create a new key. Copy it.

### 3. Create your `.env.local` file

At the project root, create `.env.local`:

```env
TURSO_DATABASE_URL=libsql://gravy-train-<your-username>.turso.io
TURSO_AUTH_TOKEN=<your-turso-token>
RESEND_API_KEY=re_<your-resend-key>
RESEND_FROM_EMAIL=you@yourdomain.com
ADMIN_SECRET=<a-long-random-string-only-you-know>
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

> **Never commit `.env.local` to git.** It is already in `.gitignore`.

### 4. Run the database migration

```bash
npm run db:generate   # generates SQL from the schema
npm run db:migrate    # applies the migration to Turso
```

This creates the `subscribers` table. You only need to run this once (and again if the schema changes).

### 5. Add env vars to Vercel

In your Vercel project dashboard → **Settings → Environment Variables**, add all five variables from `.env.local`. This makes them available in production.

---

## Accessing the Admin Panel

Navigate to `/admin` on your site (e.g., `https://yourdomain.com/admin`).

You'll see a password prompt. Enter the value of your `ADMIN_SECRET` env var. The session lasts 7 days; after that you'll need to log in again.

> **Tip:** Bookmark `/admin`. Keep your `ADMIN_SECRET` somewhere safe (password manager).

---

## Sending a Notification When You Publish a Post

1. Add your new post to `lib/posts.ts` (with a unique `slug`) and drop the MDX file in `content/posts/`.
2. Deploy the site so the new post is live.
3. Go to `/admin`.
4. In the **Send Notification** section, select the post from the dropdown.
5. Click **Send**.
6. The page will show `Sent to N subscribers.` when complete.

Each subscriber receives a personalized email with the post title, excerpt, a "Read Now" button, and their own unique unsubscribe link.

> **Note:** Resend's free tier allows 100 emails/day and 3,000/month. For a personal blog this is plenty.

---

## Managing Your Subscriber List

### View subscribers

The `/admin` dashboard shows every subscriber with their email, subscribe date, and status (Active / Unsubscribed).

### Remove a subscriber manually

In the subscriber table, click **Remove** next to any active subscriber. This soft-deletes them (marks as inactive) — their record is kept for historical counts but they won't receive future emails.

### Export the full list as CSV

Click **Export CSV** in the admin dashboard. This downloads a file named `subscribers-YYYY-MM-DD.csv` with columns:

```
id, email, subscribed_at, active
```

Open it in Excel, Numbers, or Google Sheets. You can also import it into any other email tool if you ever switch services — your data is never locked in.

---

## How Unsubscribes Work

Every email sent to subscribers includes a unique unsubscribe link:

```
https://yourdomain.com/api/unsubscribe?token=<uuid>
```

When a subscriber clicks it, they are immediately marked inactive and redirected to `/unsubscribed`. No login required — the token is enough to identify them. The token is a UUID (128-bit random), so it cannot be guessed.

---

## Sending a Notification from the Terminal (Advanced)

If you ever want to trigger a notification without opening the browser, use curl:

```bash
curl -X POST https://yourdomain.com/api/notify \
  -H "Authorization: Bearer YOUR_ADMIN_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"postSlug": "your-post-slug"}'

# → {"sent": 42}
```

This hits the external-facing notify endpoint (Bearer-token protected, not cookie-protected).

---

## Database Tasks via Turso CLI

### Open an interactive SQL shell

```bash
turso db shell gravy-train
```

### Useful queries

```sql
-- Count active subscribers
SELECT COUNT(*) FROM subscribers WHERE active = 1;

-- View all subscribers
SELECT email, subscribed_at, active FROM subscribers ORDER BY subscribed_at DESC;

-- Hard-delete an unsubscribed record permanently
DELETE FROM subscribers WHERE email = 'someone@example.com';

-- Reactivate a manually deactivated subscriber
UPDATE subscribers SET active = 1 WHERE email = 'someone@example.com';
```

### Export data directly via CLI

```bash
turso db shell gravy-train ".dump" > backup.sql
```

This creates a full SQL dump of the database — useful for backups before any major change.

---

## Rotating the Admin Password

1. Generate a new random secret (e.g., `openssl rand -hex 32`).
2. Update `ADMIN_SECRET` in `.env.local` and in Vercel's Environment Variables dashboard.
3. Redeploy. All existing admin sessions are immediately invalidated (the old cookie no longer matches).

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Subscribe form returns an error | Missing env vars on Vercel | Check all 5 env vars are set in Vercel dashboard |
| Welcome email not arriving | Resend domain not verified | Use Resend sandbox (`onboarding@resend.dev`) for testing, or complete domain verification |
| Admin login not working | `ADMIN_SECRET` mismatch | Confirm the value in Vercel matches what you're typing |
| Migration fails | Missing env vars locally | Make sure `.env.local` exists and has correct Turso credentials |
| "Post not found" when sending notification | Slug typo | The slug in the notify form must exactly match the `slug` field in `lib/posts.ts` |
