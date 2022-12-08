import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabase'
import { useUser } from '@supabase/auth-helpers-react'

const JokeForm = () => {
  const user = useUser()
  const router = useRouter()
  const [left_q, setLeft_q] = useState('')
  const [right_q, setRight_q] = useState('')
  const [left_a, setLeft_a] = useState('')
  const [loading, setLoading] = useState(false)
  const [formErr, setFormErr] = useState(null)
  const [you_tube_link, setYou_tube_link] = useState('')
  const [pt_link, setPt_link] = useState('')
  // const [screenshot_url, setScreenshot_url] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!left_q || !right_q || !left_a) {
      return
    }
    try {
      setLoading(true)
      const pack = {
        user_id: user.id,
        left_q,
        right_q,
        left_a,
        you_tube_link,
        pt_link,
        // screenshot_url,
      }
      const { data: response, error } = await supabase.from('jokes').insert([pack]).select()
      if (response) {
        router.push('/')
      }
      if (error) {
        console.log('error msg from supabase : ', error)
        setFormErr(error)
      }
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative bg-white">
      <div className="lg:absolute lg:inset-0">
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover lg:absolute lg:h-full"
            src="https://stardewvalleywiki.com/mediawiki/images/thumb/b/b9/Marriage_abigail.png/600px-Marriage_abigail.png"
            alt="Add a kind of monster"
          />
        </div>
      </div>

      <div className="relative mx-auto px-5 lg:grid lg:max-w-7xl lg:grid-cols-2">
        <div className="mx-auto max-w-md py-2 sm:max-w-xl lg:pr-5">
          <h2 className="py-5 text-center text-3xl font-bold tracking-tight sm:text-4xl">Add a joke</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-y-6 gap-x-6 pb-5">
            {/* 你知唔知⋯⋯ */}
            <div className="col-span-2 mt-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="left_q">
                你知唔知⋯⋯
              </label>
              <input
                onChange={(e) => setLeft_q(e.target.value)}
                type="text"
                value={left_q}
                id="left_q"
                placeholder="你知唔知⋯⋯"
                required
                className="focus:border-grape-500 focus:ring-grape-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            {/* 點解 */}
            <div className="col-span-2 mt-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="right_q">
                點解？
              </label>
              <input
                onChange={(e) => setRight_q(e.target.value)}
                type="text"
                value={right_q}
                id="right_q"
                placeholder="點解？"
                required
                className="focus:border-grape-500 focus:ring-grape-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            {/* 因為⋯⋯ */}
            <div className="col-span-2 mt-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="left_a">
                因為⋯⋯
              </label>
              <input
                onChange={(e) => setLeft_a(e.target.value)}
                type="text"
                value={left_a}
                id="left_a"
                placeholder="因為⋯⋯"
                required
                className="focus:border-grape-500 focus:ring-grape-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            {/* you_tube_link */}
            <div className="col-span-2 mt-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="you_tube_link">
                YouTube Link
              </label>
              <input
                onChange={(e) => setYou_tube_link(e.target.value)}
                type="text"
                value={you_tube_link}
                id="you_tube_link"
                placeholder="https://youtu.be/..."
                required
                className="focus:border-grape-500 focus:ring-grape-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            {/* pt_link */}
            <div className="col-span-2 mt-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="pt_link">
                熱血時報連結
              </label>
              <input
                onChange={(e) => setPt_link(e.target.value)}
                type="text"
                value={pt_link}
                id="pt_link"
                placeholder="https://..."
                required
                className="focus:border-grape-500 focus:ring-grape-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            {/* buttons */}
            <span className="isolate inline-flex h-16 rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => {
                  router.push('/')
                }}
                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-indigo-500 px-3 text-sm font-medium text-white hover:bg-indigo-800 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {loading ? 'Loading' : 'Submit'}
              </button>
            </span>

            {formErr && <span>{formErr}</span>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default JokeForm
