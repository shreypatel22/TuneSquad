import React, { useEffect, useState } from "react";
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
import axios from 'axios';

export default function Playlist({ setOpenPlaylistType, playlistInfo, playlistID, spotifyPlaylistID }) {
  const [value, setValue] = React.useState(2);
  const accessToken = JSON.parse(localStorage.getItem('access_token'));

  useEffect(() => {
    axios
     .get(`http://localhost:3001/finalPlaylist/${playlistID}`, {params: {spotifyPlaylistID, accessToken}})
     .then((res) => {   
       console.log("-----", res)  
     }) 
     .catch((err) => console.log(err))
 }, []);

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
          <AudiotrackIcon /> Play in Spotify
        </Button>
      </section>
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
