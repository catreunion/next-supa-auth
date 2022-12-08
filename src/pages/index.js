import { useState, useEffect } from 'react'
import { useSupabaseClient, useUser, useSession } from '@supabase/auth-helpers-react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import Head from 'next/head'
import AcDetails from '@/comp/AcDetails'
import { homePageTitle, homePageDesc } from '@/items/wording'

const HomePage = () => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const session = useSession()
  const [data, setData] = useState(null)

  // getData jokes setData
  useEffect(() => {
    const getData = async () => {
      const { data: jokes, error } = await supabaseClient.from('jokes').select()
      if (error) {
        console.log('error msg from supabase : ', error)
      } else {
        setData(jokes)
      }
    }
    // only get data if the user is logged in
    if (user) {
      getData()
    }
  }, [user])

  return (
    <>
      <Head>
        <title>{homePageTitle}</title>
        <meta name="description" content={homePageDesc} />
      </Head>

      {!session ? (
        <Auth
          redirectTo="http://localhost:3000/"
          appearance={{ theme: ThemeSupa }}
          supabaseClient={supabaseClient}
          providers={['github']}
          socialLayout="horizontal"
          theme="light"
        />
      ) : (
        <AcDetails session={session} />
      )}

      {/* {user ? <pre>{JSON.stringify(user, null, 2)}</pre> : <dir></dir>} */}

      <button
        onClick={() => {
          supabaseClient.auth.signOut()
          setData(null)
        }}
      >
        Sign out
      </button>

      {/* {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <dir></dir>} */}
      {data &&
        data.map((item) => (
          <li key={item.id}>
            <p>{item.left_q}</p>
            <p>{item.right_q}</p>
            <p>{item.left_a}</p>
          </li>
        ))}

      {/* {data.map((item) => (
        <li key={item.id}>
          <p>{item.left_q}</p>
          <p>{item.right_q}</p>
          <p>{item.left_a}</p>
        </li>
      ))} */}
    </>
  )
}

export default HomePage
