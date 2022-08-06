import React from "react"


const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=a061f41543a94d3c975ea7336dec788d&response_type=code&redirect_uri=http://localhost:3000/callback&scope=ugc-image-upload%20user-modify-playback-state%20user-read-playback-state%20user-read-currently-playing%20playlist-read-collaborative%20playlist-modify-public%20playlist-read-private%20playlist-modify-private%20app-remote-control%20streaming%20user-read-email%20user-read-private%20user-library-modify%20user-library-read"

  export default function Login() {
  return (
    <section>
      <a href={AUTH_URL}>
      <button >
        Login With Spotify
      </button>
      </a>
    </section>
  )
}