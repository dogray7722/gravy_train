# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Summary

This application is for a personal blog that will include text, pictures, and embedded videos from YouTube links. The idea is to be a more comprehensive personal portfolio than just a social media account. At the time of writing the plan is to have the blog content be comprised of local MDX components, though at some point it may be paired with a CMS.

## Project Structure

```
app/
  blog/           # blog route and related pages
  components/     # shared React components
  hooks/          # custom React hooks
  layout.tsx      # root layout (fonts, global shell)
  page.tsx        # home/landing page
  globals.css     # global styles
public/           # static assets
```

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run lint     # run ESLint
```

No test runner is configured yet.

## Stack

- **Next.js 16** with the App Router — this is a newer version with potential breaking changes vs training data; consult `node_modules/next/dist/docs/` before writing code
- **React 19**
- **Tailwind CSS v4** — configured via PostCSS (`postcss.config.mjs`); v4 uses a CSS-first config, not `tailwind.config.js`
- **TypeScript 5**

## App Router structure

All routes live under `app/`. The root layout (`app/layout.tsx`) loads Geist Sans and Geist Mono via `next/font/google` and applies them as CSS variables. Pages are `page.tsx` files co-located with their route segment folders.

Global styles are in `app/globals.css`. Static assets go in `public/`.

## ESLint

Config is in `eslint.config.mjs` using the flat config format. It extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`. Run with `npm run lint` (no directory argument needed — Next.js CLI handles it).
