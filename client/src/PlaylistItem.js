import React from "react";
import "./style/PlaylistItem.scss";
import { Box } from "@chakra-ui/react";

export default function PlaylistItem({
  name,
  spotifyPlaylistID,
  playlistID,
  setPlaylistID,
  setSpotifyPlaylistID,
  coverImage,
  setOpenPlaylist,
}) {
  return (
    <div>
      <Box
        className="playlistItem-container"
        onClick={() => {
          setSpotifyPlaylistID(spotifyPlaylistID);
          setPlaylistID(playlistID);
          setOpenPlaylist(true);
        }}
      >
        <img className="playlist-item-image" src={coverImage} alt="Playlist" />
        <div className="playlist-info-items">
          <p>{name}</p>
        </div>
      </Box>
    </div>
  );
}
