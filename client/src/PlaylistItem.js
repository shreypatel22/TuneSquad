import React from "react";
import "./style/PlaylistItem.scss";
import { Box } from "@chakra-ui/react";

export default function PlaylistItem({
  name,
  admin,
  spotifyPlaylistID,
  playlistID,
  setPlaylistID,
  setSpotifyPlaylistID,
  coverImage
}) { 
  return (
    <div>
        <Box className="playlistItem-container" onClick={() => {
          setSpotifyPlaylistID(spotifyPlaylistID);
          setPlaylistID(playlistID);
        }}>
          <img
            className="playlist-item-image"
            src={coverImage}
            alt="Playlist"
          />

          <p>{name}</p>
          <div className="playlist-info">                     
          </div>
        </Box>
    </div>
  );
}

