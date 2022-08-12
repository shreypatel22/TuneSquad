import PersonAddIcon from "@mui/icons-material/PersonAdd";
import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { EditIcon, Search2Icon } from "@chakra-ui/icons";
import SearchBar from "./SearchBar";
import "./style/Playlist.scss";

export default function Playlist({ setOpenPlaylistType, playlistID, spotifyPlaylistID, playlistInfo }) {
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
               <p> {playlistInfo.name}</p>
              </section>
                <p> Admin: "NAME"</p>
                <p> Collaborators: "NAME", "NAME", etc</p>
                <p> Songs: 100</p>
                <p> Voters: 5</p>
            </div>
          </div>
        </section>
      </Box>
      <Button className="edit-button">
        <EditIcon  />
      </Button>

      <div>
      <Button className="add-user-button">
        <PersonAddIcon />
      </Button>
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
      {openSearchBar && <SearchBar setOpenSearchBar={setOpenSearchBar} playlistID={playlistID} spotifyPlaylistID={spotifyPlaylistID} />}
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
