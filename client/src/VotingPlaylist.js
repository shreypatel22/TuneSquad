import PersonAddIcon from "@mui/icons-material/PersonAdd";
import React, { useState } from "react";
import { Box, Button, Container } from "@chakra-ui/react";
import { EditIcon, Search2Icon } from "@chakra-ui/icons";
import SearchBar from "./SearchBar";
import "./style/Playlist.scss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Playlist({ setOpenPlaylistType }) {
  const [openSearchBar, setOpenSearchBar] = useState(false);


  return (
    <>
      <Box>
        <section className="playlist-info-section">
          <div className="playlist-info">
            <img
              className="playlist-cover-image"
              src="https://i.scdn.co/image/ab67706c0000bebb485cbbef86d7f7fb3fb6128e"
              alt="Playlist"
            />
            <div className="playlist-text">
              <section className="playlist-name">
                <p> Playlist 1</p>
              </section>
              <p> Admin: "NAME", "NAME", etc</p>
              <p> Collaborators: "NAME", "NAME", etc</p>
              <p> Songs: 100</p>
            </div>
          </div>
        </section>
      </Box>
      <section>
        <EditIcon float={"right"} w={20} h={20} mr={10} />
      </section>

      <div>
        <PersonAddIcon sx={{ ml: 1 }} />
      </div>

      <Button
        className="playlist-type-on"
        onClick={() => setOpenPlaylistType(false)}
      >
        Voting
      </Button>
      <Button
        className="playlist-type-off"
        onClick={() => setOpenPlaylistType(true)}
      >
        Final
      </Button>
      <hr className="divider" />
      {openSearchBar && <SearchBar setOpenSearchBar={setOpenSearchBar} />}
      <Button
        className="playlist-search"
        onClick={() => setOpenSearchBar(true)}
      >
        <Search2Icon pr={6} />
        Search for a song
      </Button>
    </>
  );
}
