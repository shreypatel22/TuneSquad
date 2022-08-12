import PersonAddIcon from "@mui/icons-material/PersonAdd";
import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { EditIcon, Search2Icon, ViewOffIcon } from "@chakra-ui/icons";
import SearchBar from "./SearchBar";
import "./style/Playlist.scss";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function Playlist({
  setOpenPlaylistType,
  playlistID,
  spotifyPlaylistID,
  playlistInfo,
}) {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [value, setValue] = React.useState();

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
        <EditIcon />
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
      {openSearchBar && (
        <SearchBar
          setOpenSearchBar={setOpenSearchBar}
          playlistID={playlistID}
          spotifyPlaylistID={spotifyPlaylistID}
        />
      )}
      <Button
        className="playlist-search"
        onClick={() => setOpenSearchBar(true)}
      >
        <Search2Icon pr={6} />
        Search for a song
      </Button>

      <TableContainer display={"grid"}>
        <Table>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Added By</Th>
              <Th isNumeric>Data Added</Th>
              <Th isNumeric>Rating</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>Song Title - Artist</Td>
              <Td>Username</Td>
              <Td isNumeric>12/08/22</Td>
              <Td>
                <Typography component="legend"></Typography>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
