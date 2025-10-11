## Ryxel Store Web App (Next.js)

Ryxel Store is an e-commerce web application focused on PC and gaming products. It is built with Next.js App Router, TypeScript, Tailwind CSS, and Ant Design. The app integrates with a Node.js backend (ryxel-server) and an AI service (ryxel-ai-server) for a Vietnamese-first, AI-assisted shopping experience.

Key features:

- Modern UI/UX with Tailwind CSS and Ant Design components
- Product catalog, categories, blogs, and content pages (MDX support)
- Authentication and session via HTTP-only cookies
- Client notifications (Firebase Web Push)
- Payment branding with Stripe assets
- AI-enhanced chatbot (front-end UI) that talks to your backend RAG service

Note: This repository contains only the Next.js frontend. It relies on environment variables to talk to the backend API (ryxel-server) and any AI endpoints configured there.

---

## Tech Stack

- Next.js 14 (App Router)
- React 19, TypeScript
- Tailwind CSS, Tailwind Typography, Prettier Tailwind plugin
- Ant Design 5
- MDX (next-mdx-remote, @mdx-js/react)
- Firebase Web Push (messaging service worker)

---

## Prerequisites

- Node.js 18+ (recommended LTS)
- npm (or pnpm/yarn/bun)

Optional services used in production:

- ryxel-server (Node/Express API) deployed (e.g., Render): https://ryxel-server.onrender.com
- ryxel-ai-server (Flask) if chatbot/AI features are enabled

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill the values for your environment.

Required variables:

- NEXT_PUBLIC_API_URL: Public base URL for client-side requests (e.g., https://ryxel-server.onrender.com)
- API_URL: Internal base URL for server-side requests (e.g., https://ryxel-server.onrender.com/api/v1)
- JWT_COOKIES_EXPIRES_IN: Days before JWT cookie expires (default 30)
- REAUTHENTICATED_COOKIES_EXPIRES_IN: Minutes for reauthentication window (default 30)
- NEXT_PUBLIC_STOCK_LIMIT: Threshold below which stock is shown as low

Firebase (optional but recommended for notifications):

- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID
- NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

---

## Install and Run (Windows)

1. Install dependencies

```cmd
npm install
```

2. Start development server

```cmd
npm run dev
```

Visit http://localhost:3000

3. Build for production

```cmd
npm run build
```

4. Start production server (after build)

```cmd
npm run start
```

Scripts (from package.json):

- dev: next dev
- build: next build
- start: next start
- lint: next lint

---

## Project Structure

```
src/
	app/              # App Router pages, layouts, server components
	content/          # MD/MDX content (blogs, pages)
	mdx-components.tsx
public/             # Static assets (images, sw, logos)
tailwind.config.ts  # Tailwind setup
next.config.ts      # Next configuration
```

Notable public assets:

- `public/firebase-messaging-sw.js` – service worker for Web Push
- `public/stripe.png`, `public/visa.png`, `public/mastercard.png` – payment brand assets

---

## Chatbot UI Integration

The front-end chatbox component renders markdown and communicates with your backend chatbot endpoints exposed by `ryxel-server`. Ensure:

- `NEXT_PUBLIC_API_URL` points to your server host (e.g., https://ryxel-server.onrender.com)
- The backend has RAG and AI endpoints configured and responding in Vietnamese as designed

---

## Deployment

You can deploy on any Node hosting (Vercel, Render, Azure, etc.). For static optimization, some pages are server-rendered due to authentication and dynamic data.

Basic steps:

1. Set environment variables on your hosting platform (match `.env.example`)
2. Build the app (`npm run build`)
3. Start the server (`npm start`)

On Vercel, most settings are auto-detected. Ensure `NEXT_PUBLIC_API_URL` and `API_URL` are set to production server URLs.

---

## Troubleshooting

- 404s or CORS errors: Confirm `NEXT_PUBLIC_API_URL` and `API_URL` are correct and your backend allows the frontend origin.
- Authentication not persisting: Check cookie domain/secure flags and that the site is served over HTTPS in production.
- Chatbot not responding or wrong language: Verify `ryxel-server` AI config and that the AI server URL is set to production, not localhost.
- Images not loading: Ensure asset paths and any remote image domains are configured in `next.config.ts`.

---

## License

This project is part of the Ryxel demo stack. Unless stated otherwise, it is provided as-is for demonstration and academic purposes.
