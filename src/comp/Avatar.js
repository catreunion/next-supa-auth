import React, { useEffect, useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

const Avatar = ({ uid, url, size, onUpload }) => {
  const supabase = useSupabaseClient()
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const loadImg = async (path) => {
      try {
        const { data, error } = await supabase.storage.from("avatars").download(path)
        if (error) {
          throw error
        }
        setAvatarUrl(URL.createObjectURL(data))
      } catch (error) {
        console.log("Error downloading image: ", error)
      }
    }

    if (url) loadImg(url)
  }, [url])

  const uploadAvatar = async (e) => {
    try {
      setUploading(true)
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("You must select an image to upload.")
      }
      const file = e.target.files[0]
      const fileExtn = file.name.split(".").pop()
      const fileName = `${uid}.${fileExtn}`
      const filePath = `${fileName}`
      let { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file, { upsert: true })
      if (uploadError) {
        throw uploadError
      }
      onUpload(filePath)
    } catch (error) {
      alert("Error uploading avatar!")
      console.log(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      {avatarUrl ? <img src={avatarUrl} alt="Avatar" style={{ height: size, width: size }} /> : <div style={{ height: size, width: size }} />}
      <div style={{ width: size }}>
        <label className="button primary block" htmlFor="single">
          {uploading ? "Uploading ..." : "Upload"}
        </label>
        <input
          style={{
            visibility: "hidden",
            position: "absolute"
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </>
  )
}

export default Avatar
