////////////////////// EACH INDIVIDUAL PLAYLIST ///////////

import React from "react";
import "./style/PlaylistItem.scss";
import { Box } from "@chakra-ui/react";

export default function PlaylistItem({

  name,
  admin,
  spotifyPlaylistID,
  setOpenPlaylist,
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
            <p> PlaylistID: {playlistID}</p>            
            <p> Songs: 100</p>
            <p> Voters: 5</p>
          </div>
        </Box>
    </div>
  );
}

{
  /* <Box className="playlistItem-container">
        <img
          className="playlist-item-image"
          src="https://i.scdn.co/image/ab67706c0000bebb485cbbef86d7f7fb3fb6128e"
          alt="Playlist"
        />
        <p> Playlist 1</p>
        <div className="playlist-info">
          <p> Songs: 100</p>
          <p> Voters: 5</p>
        </div>

          <p> Playlist 1</p>
          <div className="playlist-info">
            <p> Songs: 100</p>
            <p> Voters: 5</p>
          </div>

        </Box>
        <Box className="playlistItem-container">
          <img
            className="playlist-item-image"
            src="https://external-preview.redd.it/sZbgrdtFO8dxIIq-_hKMMqoOnjuIOaFIzyV6krgQeW0.jpg?auto=webp&s=79330a9e63308918190770d03ac55c4c391d7301"
            alt="Playlist"
          />
          <p> Playlist 2</p>
          <div className="playlist-info">
            <p> Songs: 50</p>
            <p> Voters: 4</p>
          </div>
        </Box>
        <Box className="playlistItem-container">
          <img
            className="playlist-item-image"
            src="https://www.listenspotify.com/uploaded_files/Thf_1586701254.PNG"
            alt="Playlist"
          />
          <p> Playlist 3</p>
          <div className="playlist-info">
            <p> Songs: 150</p>
            <p> Voters: 2</p>
          </div>
        </Box>
        <Box className="playlistItem-container">
          <img
            className="playlist-item-image"
            src="https://data.whicdn.com/images/324480905/original.jpg?t=1546110527"
            alt="Playlist"
          />
          <p> Playlist 4</p>
          <div className="playlist-info">
            <p> Songs: 200</p>
            <p> Voters: 5</p>
          </div>
        </Box>
        <Box className="playlistItem-container">
          <img
            className="playlist-item-image"
            src="https://i.pinimg.com/originals/9a/b9/f9/9ab9f9a5a1001e820af128b5c20f1b55.jpg"
            alt="Playlist"
          />
          <p> Playlist 5</p>
          <div className="playlist-info">
            <p> Songs: 40</p>
            <p> Voters: 2</p>
          </div>
        </Box>
        <Box className="playlistItem-container">
}
