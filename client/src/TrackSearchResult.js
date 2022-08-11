import React from "react"
import './style/Playlist.scss'
import {
 Button
} from "@chakra-ui/react";

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

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
      <Button> Add song </Button>
    </div>
  )
}