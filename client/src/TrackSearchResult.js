import React from "react"
import './style/Playlist.scss'
import {
 Button
} from "@chakra-ui/react";
import axios from "axios"

export default function TrackSearchResult({ track, spotifyTrackID, playlistID, setSpotifyTrackID }) {
  // function handlePlay() {
    //   chooseTrack(track)
    // onClick={handlePlay}
  // }

  const username = JSON.parse(localStorage.getItem('username'));

  const saveSongToVoting = () => {
    console.log("1-----a-sdf--sa-f-sdf", spotifyTrackID)
    axios.post('http://localhost:3001/addSongVoting', {playlistID, spotifyTrackID, username})
    .then(function ({data}) {
       console.log("THIS IS THE FRONT END: ", data)
     
  
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div
      className="searchbar-track"
      style={{ cursor: "pointer" }}

    >
      <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
      <div className="track-info" >
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
      {/* <p> {playlistID}</p> */}
      <Button  backgroundColor='#3A406D' _hover={{ bg: '#50536b' }} color="#ee5d88" ml={'auto'} mb={'10px'} onClick={() => 
        {setSpotifyTrackID(spotifyTrackID); saveSongToVoting(playlistID, spotifyTrackID)}}> Add song </Button>
   
    </div>
  )
}