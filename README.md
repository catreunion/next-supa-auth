今年回歸，澳門九成唔會慶賀
點解？
因為澳門特首：賀　一　成

你知唔知林鄭老公，鍾意林鄭乜嘢？
乜嘢呀？
貪佢唔會日娥月娥

```sql
CREATE POLICY "public read jokes" ON "public"."jokes"
AS PERMISSIVE FOR SELECT
TO public
USING (is_published = true)

select * from jokes
```

- Next.js is a highly versatile framework offering pre-rendering at build time (SSG), server-side rendering at request time (SSR), API routes, and middleware edge-functions.

Every Supabase project is configured with Storage for managing large files like photos and videos.

- [API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

- The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

Redirect URLs and wildcards#
When using third-party providers, the Supabase client library redirects the user to the provider. When the third-party provider successfully authenticates the user, the provider redirects the user to the Supabase Auth callback URL where they are further redirected to the URL specified in the redirectTo parameter. This parameter defaults to the SITE_URL. You can modify the SITE_URL or add additional redirect URLs.

You can use wildcard match patterns to support preview URLs from providers like Netlify and Vercel. See the full list of supported patterns. Use this tool to test your patterns.

⚠️ WARNING: While the "globstar" (\*\*) is useful for local development and preview URLs, we recommend setting the exact redirect URL path for your site URL in production.

Netlify preview URLs
For deployments with Netlify, set the SITE_URL to your official site URL. Add the following additional redirect URLs for local development and deployment previews:

http://localhost:3000/**
https://**--my_org.netlify.app/\*\*
Vercel preview URLs
For deployments with Vercel, set the SITE_URL to your official site URL. Add the following additional redirect URLs for local development and deployment previews:

http://localhost:3000/**
https://\*-username.vercel.app/**
Vercel provides an environment variable for the URL of the deployment called NEXT_PUBLIC_VERCEL_URL. See the Vercel docs for more details. You can use this variable to dynamically redirect depending on the environment:

```js
const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'github'
  options: {
    redirectTo: getURL()
  }
}
```

Mobile deep linking URIs
For mobile applications you can use deep linking URIs. For example for your SITE_URL you can specify something like com.supabase://login-callback/ and for additional redirect URLs something like com.supabase.staging://login-callback/ if needed.

# Client-side data fetching with RLS

For row level security to work properly when fetching data client-side, you need to make sure to use the supabaseClient from the useSupabaseClient hook and only run your query once the user is defined client-side in the useUser() hook:

Server-side rendering (SSR)#
Create a server supabase client to retrieve the logged in user's session:

```js
// pages/profile.js
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default function Profile({ user }) {
  return <div>Hello {user.name}</div>
}

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx)
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  }
}
```

Server-side data fetching with RLS#
You can use the server supabase client to run row level security authenticated queries server-side:

```js
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default function ProtectedPage({ user, data }) {
  return (
    <>
      <div>Protected content for {user.email}</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx)
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  // Run queries with RLS on the server
  const { data } = await supabase.from('users').select('*')

  return {
    props: {
      initialSession: session,
      user: session.user,
      data: data ?? [],
    },
  }
}
```

Server-side data fetching to OAuth APIs using provider token {#oauth-provider-token}#
When using third-party auth providers, sessions are initiated with an additional provider_token field which is persisted in the auth cookie and can be accessed within the session object. The provider_token can be used to make API requests to the OAuth provider's API endpoints on behalf of the logged-in user.

```js
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default function ProtectedPage({ user, allRepos }) {
  return (
    <>
      <div>Protected content for {user.email}</div>
      <p>Data fetched with provider token:</p>
      <pre>{JSON.stringify(allRepos, null, 2)}</pre>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx)
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  // Retrieve provider_token & logged in user's third-party id from metadata
  const { provider_token, user } = session
  const userId = user.user_metadata.user_name

  const allRepos = await (
    await fetch(`https://api.github.com/search/repositories?q=user:${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `token ${provider_token}`,
      },
    })
  ).json()

  return { props: { user, allRepos } }
}
```

Protecting API routes#
Create a server supabase client to retrieve the logged in user's session:

```js
// pages/api/protected-route.js
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

const ProtectedRoute = async (req, res) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient({ req, res })
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
    return res.status(401).json({
      error: 'not_authenticated',
      description: 'The user does not have an active session or is not authenticated',
    })

  // Run queries with RLS on the server
  const { data } = await supabase.from('test').select('*')
  res.json(data)
}

export default ProtectedRoute
```

Auth with Next.js Middleware#
As an alternative to protecting individual pages you can use a Next.js Middleware to protect the entire directory or those that match the config object. In the following example, all requests to /middleware-protected/\* will check whether a user is signed in, if successful the request will be forwarded to the destination route, otherwise the user will be redirected:

middleware.ts

```js
import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next()
  // Create authenticated Supabase Client.
  const supabase = createMiddlewareSupabaseClient({ req, res })
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check auth condition
  if (session?.user.email?.endsWith('@gmail.com')) {
    // Authentication successful, forward request to protected route.
    return res
  }

  // Auth condition not met, redirect to home page.
  const redirectUrl = req.nextUrl.clone()
  redirectUrl.pathname = '/'
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: '/middleware-protected',
}
```
