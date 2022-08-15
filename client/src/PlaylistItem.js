import React from "react";
import "./style/PlaylistItem.scss";
import { Box } from "@chakra-ui/react";

export default function PlaylistItem({
  name,
  admin,
  spotifyPlaylistID,
  playlistID,
  setPlaylistID,
  setSpotifyPlaylistID
}) { 
  return (
    <div>
        <Box className="playlistItem-container" onClick={() => {
          setSpotifyPlaylistID(spotifyPlaylistID);
          setPlaylistID(playlistID);
        }}>
          <img
            className="playlist-item-image"
            src="https://i.scdn.co/image/ab67706c0000bebb485cbbef86d7f7fb3fb6128e"
            alt="Playlist"
          />
          <div className="playlist-info-items">
          <p>{name}</p>

          </div>
          <div className="playlist-info">            
            <p> PlaylistID: {playlistID}</p>            
            <p> Songs: 100</p>
            <p> Voters: 5</p>
          </div>
        </Box>
    </div>
  );
}

