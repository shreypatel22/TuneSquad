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
import axios from "axios";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function FinalPlaylist({
  setOpenPlaylistType,
  playlistInfo,
  playlistID,
  spotifyPlaylistID,
  setPlayingTrack,

}) {
  const [value, setValue] = React.useState(2);
  const [allTracksInfo, setAllTrackInfo] = useState([]);
  const accessToken = JSON.parse(localStorage.getItem("access_token"));

  function handlePlay(trackURI) {
    let uriObj = { uri: trackURI };
    setPlayingTrack(uriObj);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3001/finalPlaylist/${playlistID}`, {
        params: { spotifyPlaylistID, accessToken },
      })
      .then((res) => {
        setAllTrackInfo((prev) => [...prev, res.data.allTracksInfo]);
        // console.log("-----", res);
      })
      .catch((err) => console.log(err));
  }, []);

  let tracks;

  if (allTracksInfo[0]) {
    tracks = allTracksInfo[0].map((track, index) => {
      return (
        <Tr key={track.trackID}>
          <Td>
            {" "}
            <Button
              className="play-button"
              onClick={() => handlePlay(track.trackURI)}
            >
              <PlayArrowIcon />
            </Button>{" "}
          </Td>
          <Td>{index + 1}</Td>
          <Td>{track.trackName}</Td>
          <Td>{track.trackArtist}</Td>
          <Td>Username</Td>
          <Td isNumeric>{track.dateAdded}</Td>
          <Td>
            {" "}
            <Typography component="legend"></Typography>
            <Rating name="read-only" value={value} readOnly />
          </Td>
        </Tr>
      );
    });
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
              <Th>Play</Th>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Artist</Th>
              <Th>Added By</Th>
              <Th isNumeric>Date Added</Th>
              <Th isNumeric>Rating</Th>
            </Tr>
          </Thead>
          <Tbody>{tracks}</Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
