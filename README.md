- Next.js is a highly versatile framework offering pre-rendering at build time (SSG), server-side rendering at request time (SSR), API routes, and middleware edge-functions.

- Row Level Security: data is protected so that individuals can only access their own data.

- [repo]()

- create database schema

  - SQL Editor

  - User Management Starter

- Get environment variables : - Settings --> sidebar --> API

See the complete example on GitHub and deploy it to Vercel.
Explore the pre-built Auth UI for React.
Explore the Auth Helpers for Next.js.
Explore the Supabase Cache Helpers.
See the Next.js Subscription Payments Starter template on GitHub.

```bash
# install the Supabase client library
yarn add @supabase/supabase-js

# install the auth helpers for React and Next.js
yarn add @supabase/auth-helpers-react @supabase/auth-helpers-nextjs

# install the Supabase Auth UI for React
# authenticate users via OAuth, email, and magic links
npm install @supabase/auth-ui-react
```

Every Supabase project is configured with Storage for managing large files like photos and videos.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
