import { useState, useEffect } from "react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import Avatar from "@/comp/Avatar"

const AcDetails = ({ session }) => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatarURL, setAvatarURL] = useState(null)

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true)
        let { data, error, status } = await supabaseClient.from("profiles").select(`username, website, avatar_url`).eq("id", user.id).single()
        if (error && status !== 406) {
          throw error
        }
        if (data) {
          setUsername(data.username)
          setWebsite(data.website)
          setAvatarURL(data.avatar_url)
          console.log("data: ", data)
        }
      } catch (error) {
        alert("Error loading user data!")
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getProfile()
  }, [session])

  const updateProfile = async ({ username, website, avatarURL }) => {
    try {
      setLoading(true)
      const updates = {
        id: user.id,
        username,
        website,
        avatar_url: avatarURL,
        updated_at: new Date().toISOString()
      }
      let { error } = await supabaseClient.from("profiles").upsert(updates)
      if (error) throw error
      alert("Profile updated!")
    } catch (error) {
      alert("Error updating the data!")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div>
        <label htmlFor="email">Email</label>
        <input type="text" value={session.user.email} id="email" disabled />
      </div>

      <div>
        <label htmlFor="username">Username</label>
        <input type="text" value={username || ""} id="username" onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div>
        <label htmlFor="website">Website</label>
        <input type="website" value={website || ""} id="website" onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <Avatar
        uid={user.id}
        url={avatarURL}
        size={150}
        onUpload={(url) => {
          setAvatarURL(url)
          updateProfile({ username, website, avatarURL: url })
        }}
      />

      <div>
        <button onClick={() => updateProfile({ username, website, avatarURL })} disabled={loading}>
          {loading ? "Loading ..." : "Update"}
        </button>

        <button onClick={() => supabaseClient.auth.signOut()}>Sign Out</button>
      </div>
    </>
  )
}

export default AcDetails
