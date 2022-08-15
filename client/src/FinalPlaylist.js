import React, { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import "./style/Playlist.scss";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import DeleteIcon from "@mui/icons-material/Delete";
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
  collaborators,
}) {
  // const [value, setValue] = React.useState(2);
  const [allTracksInfo, setAllTrackInfo] = useState([]);
  const [snapshotID, setSnapshotID] = useState([]);
  const accessToken = JSON.parse(localStorage.getItem("access_token"));
  const userID = JSON.parse(localStorage.getItem("userID"));

  function handlePlay(trackURI) {
    let uriObj = { uri: trackURI };
    setPlayingTrack(uriObj);
  }

  const handleDeleteTrack = (trackURI, snapshotID) => {
   axios.post(`http://localhost:3001/finalPlaylist/${playlistID}/deleteTrack`, {trackURI, snapshotID, accessToken, spotifyPlaylistID})
   .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/finalPlaylist/${playlistID}`, {
        params: { spotifyPlaylistID, accessToken },
      })
      .then((res) => {
        setAllTrackInfo((prev) => [...prev, res.data.allTracksInfo]);
        setSnapshotID(res.data.snapshotID);
      })
      .catch((err) => console.log(err));
  }, []);

  let tracks;
  console.log(allTracksInfo);
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
            <Rating precision={0.5} name="read-only" value={track.rating} readOnly />
          </Td>
          <Td>
            <DeleteIcon
              className="delete-icon"
              onClick={() => {
                handleDeleteTrack(track.trackURI, snapshotID);
              }}
            />
          </Td>
        </Tr>
      );
    });
  }

  let collaboratorsNames = collaborators.join(", ");

  return (
    <>
      <Box>
        <section className="playlist-info-section">
          <div className="playlist-info">
            <img
              className="playlist-cover-image"
              src={playlistInfo.image_url}
              alt="Playlist"
            />
            <div className="playlist-text">
              <section className="playlist-name">
                <p> {playlistInfo.name}</p>
              </section>
              <p> Admin: {playlistInfo.admin_username}</p>
              <p> Collaborators: {collaboratorsNames}</p>
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
          <AudiotrackIcon /> Add Playlist to Spotify
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
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>{tracks}</Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
