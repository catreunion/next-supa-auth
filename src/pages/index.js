import { useState, useEffect } from 'react'
import { useSupabaseClient, useUser, useSession } from '@supabase/auth-helpers-react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import Head from 'next/head'
// import AcDetails from '@/comp/AcDetails'
import TodoList from '@/comp/TodoList'
import { homePageTitle, homePageDesc } from '@/items/wording'
import { supabase } from '@/lib/supabase'

const HomePage = () => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const session = useSession()
  const [data, setData] = useState(null)

  // get todos
  useEffect(() => {
    const getData = async () => {
      const { data: todos, error } = await supabaseClient.from('todos').select()
      if (error) {
        console.log('error msg from supabase : ', error)
      } else {
        setData(todos)
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
        <div className="flex h-full w-full items-center justify-center p-3">
          <Auth
            redirectTo="http://localhost:3000/"
            appearance={{ theme: ThemeSupa }}
            supabaseClient={supabaseClient}
            // providers={['github']}
            socialLayout="horizontal"
            theme="light"
          />
        </div>
      ) : (
        <div className="justify-centers flex h-full w-full flex-col items-center">
          {/* <AcDetails session={session} /> */}
          {/* <TodoList data={data} /> */}
          <TodoList />
          <button
            onClick={() => {
              supabaseClient.auth.signOut()
              setData(null)
            }}
          >
            Sign out
          </button>
        </div>
      )}

      {session ? <pre>{JSON.stringify(session, null, 2)}</pre> : <dir></dir>}

      {/* {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <dir></dir>} */}
    </>
  )
}

export default HomePage
