import { useState } from "react"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"

const App = ({ Component, pageProps }) => {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    // wrap `App` with `SessionContextProvider`
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}

export default App
