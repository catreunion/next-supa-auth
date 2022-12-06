import { useEffect, useState } from 'react'
import { useSupabaseClient, useSession, useUser } from '@supabase/auth-helpers-react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import Head from 'next/head'
import AcDetails from '@/comp/AcDetails'

const HomePage = () => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const session = useSession()
  const [data, setData] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabaseClient.from('running').select()
      setData(data)
    }
    // only get data if the user is logged in
    if (user) getData()
  }, [user])

  return (
    <>
      <Head>
        <title>title</title>
        <meta name="description" content="desc" />
      </Head>

      {!session ? (
        <Auth
          redirectTo="http://localhost:3000/"
          appearance={{ theme: ThemeSupa }}
          supabaseClient={supabaseClient}
          providers={['google', 'github']}
          socialLayout="horizontal"
          theme="light"
        />
      ) : (
        <AcDetails session={session} />
      )}

      {user ? <pre>{JSON.stringify(user, null, 2)}</pre> : <dir></dir>}

      <button
        onClick={() => {
          supabaseClient.auth.signOut()
          setData(null)
        }}
      >
        Sign out
      </button>

      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <dir></dir>}
    </>
  )
}

export default HomePage
