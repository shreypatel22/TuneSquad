import React from "react"
import './Login.scss'


const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=77741cebb6ba463b97ea3b6b8e990518&response_type=code&redirect_uri=http://localhost:3000&scope=ugc-image-upload%20user-modify-playback-state%20user-read-playback-state%20user-read-currently-playing%20playlist-read-collaborative%20playlist-modify-public%20playlist-read-private%20playlist-modify-private%20app-remote-control%20streaming%20user-read-email%20user-read-private%20user-library-modify%20user-library-read"

  export default function Login() {
  return (
      <a href={AUTH_URL}>
      <button className="login-button">
        Login With Spotify
      </button>
      </a>
  )
}