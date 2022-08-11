import React from "react"
import './style/Playlist.scss'
import {
 Button
} from "@chakra-ui/react";

export default function TrackSearchResult({ track, chooseTrack, playlistID }) {
  function handlePlay() {
    chooseTrack(track)
  }

  // const addSongToVoting = () => {
  //   axios.post('http://localhost:3001/addSongVoting', {playlistName, coverURL, description, accessToken, userID})
  //   .then(function ({data}) {      
  //     console.log('---', data.newPlaylist);
  //     setPlaylists((prev) => [...prev, data.newPlaylist])
  //     setOpenModal(false)
  //     console.log('playlists', playlists)
  //     // window.location.href = "/" 
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }

  return (
    <div
      className="searchbar-track"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
      <div className="track-info" >
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
      <Button  backgroundColor='#3A406D' _hover={{ bg: '#50536b' }} color="#ee5d88" ml={'auto'} > Add song </Button>
      {/* onClick={addSongToVoting}  ---- add this later on when we get the id to load */}
    </div>
  )
}