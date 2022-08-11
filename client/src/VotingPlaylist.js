import PersonAddIcon from "@mui/icons-material/PersonAdd";
import React, { useState } from "react";
import { Box, Button, Divider } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import SearchBar from "./SearchBar";
import "./style/Playlist.scss";

export default function Playlist({ setOpenPlaylistType, playlistID, spotifyPlaylistID, playlistInfo }) {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  
  return (
    <>
      <Box>
        <img
          className="playlist-item-image"
          src="https://i.scdn.co/image/ab67706c0000bebb485cbbef86d7f7fb3fb6128e"
          alt="Playlist"
        />
        <p> {playlistInfo.name}</p>
        <div className="playlist-info">
          <p> Songs: 100</p>
          <p> Voters: 5</p>
        </div>
      </Box>
      <section>
        <EditIcon float={'right'} w={20} h={20}/>
      </section>
      
      <div>
        <PersonAddIcon />
      </div>

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
      <hr className="divider"/>
      {openSearchBar && <SearchBar setOpenSearchBar={setOpenSearchBar} />}
      <Button
        className="playlist-search"
        onClick={() => setOpenSearchBar(true)}
      >
        Search for a song
      </Button>
    </>
  );
}
