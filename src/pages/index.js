import Head from "next/head"
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react"
import { Auth, ThemeSupa } from "@supabase/auth-ui-react"
import AcDetails from "@/comp/AcDetails"

const HomePage = () => {
  const supabaseClient = useSupabaseClient()
  const session = useSession()

  return (
    <>
      <Head>
        <title>title</title>
        <meta name="description" content="desc" />
      </Head>

      {!session ? <Auth supabaseClient={supabaseClient} appearance={{ theme: ThemeSupa }} theme="dark" /> : <AcDetails session={session} />}
    </>
  )
}

export default HomePage
