import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import "./style/Playlist.scss";

export default function Playlist({ setOpenPlaylistType }) {

  return (
    <>
      <Box>
        <img
          className="playlist-cover-image"
          src="https://i.scdn.co/image/ab67706c0000bebb485cbbef86d7f7fb3fb6128e"
          alt="Playlist"
        />
        <p> Playlist 1</p>
        <div className="playlist-info">
          <p> Songs: 100</p>
          <p> Voters: 5</p>
        </div>
      </Box>
      <Button
        className="playlist-type-off"
        onClick={() => setOpenPlaylistType(false)}
      >
        voting
      </Button>
      <Button
        className="playlist-type-on"
        onClick={() => setOpenPlaylistType(true)}
      >
        Final
      </Button>
    </>
  );
}
