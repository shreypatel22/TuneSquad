import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import "./style/Playlist.scss";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
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
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function Playlist({ setOpenPlaylistType, playlistInfo, track, chooseTrack }) {
  const [value, setValue] = React.useState(2);

    ////// FOR PLAYER
  function handlePlay() {
    chooseTrack(track);
  }
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
            </div>
          </div>
        </section>
      </Box>
      <Button
        className="playlist-type-off"
        onClick={() => setOpenPlaylistType(false)}
      >
        Voting
      </Button>
      <Button
        className="playlist-type-on"
        onClick={() => setOpenPlaylistType(true)}
      >
        Final
      </Button>
      <hr className="divider" />
      <section className="play-spotify-section">
        <Button className="play-spotify">
          <AudiotrackIcon /> Listen in Spotify
        </Button>
      </section>
      <TableContainer display={"grid"}>
        <Table>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Added By</Th>
              <Th isNumeric>Date Added</Th>
              <Th isNumeric>Rating</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
              <Button className="play-button" onClick={handlePlay}>1<PlayArrowIcon /></Button>
              </Td>
              <Td>Song Title - Artist</Td>
              <Td>Username</Td>
              <Td isNumeric>12/08/22</Td>
              <Td>
                {" "}
                <Typography component="legend"></Typography>
                <Rating name="read-only" value={value} readOnly />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
