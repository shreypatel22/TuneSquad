import PersonAddIcon from "@mui/icons-material/PersonAdd";
import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import "./style/Playlist.scss";

export default function Playlist({ setOpenPlaylistType }) {
  const [openSearchBar, setOpenSearchBar] = useState(false);

  return (
    <>
      <Box>
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
      </Box>
      <div>
        <PersonAddIcon />
      </div>
      {openSearchBar && <SearchBar setOpenSearchBar={setOpenSearchBar} />}
      <Button onClick={() => setOpenSearchBar(true)}>Search for a song</Button>
      <Button
        className="playlist-type-on"
        onClick={() => setOpenPlaylistType(false)}
      >
        voting
      </Button>
      <Button
        className="playlist-type-off"
        onClick={() => setOpenPlaylistType(true)}
      >
        Final
      </Button>
    </>
  );
}
