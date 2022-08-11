import React from "react";
import "./style/PlaylistItem.scss";
import { Box } from "@chakra-ui/react";

export default function PlaylistItem({
  key,
  name,
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

          <p>{name}</p>
          <div className="playlist-info">
            <p> key: {key}</p>
            <p> Songs: 100</p>
            <p> Voters: 5</p>
          </div>
        </Box>
    </div>
  );
}
