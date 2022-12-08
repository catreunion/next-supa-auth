import { supabase } from '@/lib/supabase'

export const getServerSideProps = async ({ params }) => {
  const { data: joke, error } = await supabase
    .from('jokes')
    .select('*, joke_comments(*)')
    .eq('id', params.id)
    .single()

  if (joke) {
    // console.log(data)
  }
  if (error) {
    // console.log(error)
  }

  return {
    props: {
      joke,
    },
  }
}

const JokePage = ({ joke }) => {
  return (
    <>
      <div>{joke.id}</div>
      <div>{joke.chong_q}</div>
      <div>{joke.wong_q}</div>
      <div>{joke.chong_a}</div>
      <pre>{JSON.stringify(joke, null, 2)} </pre>
    </>
  )
}

export default JokePage
