import React from "react"
import './style/PlaylistSidebar.scss'



export default function PlaylistSidebar({playlists}) {  

  let playlistsNames;

  if (playlists) {
    playlistsNames = playlists.map(playlist => {      
      return (
        <p key={playlist.id}> {playlist.name}</p>
      )
    })
  }
  return (
    
      <div>
        {playlistsNames}
      </div>
  )
}