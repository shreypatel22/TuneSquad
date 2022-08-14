import PersonAddIcon from "@mui/icons-material/PersonAdd";
import React, { useState, useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import { EditIcon, Search2Icon, ViewOffIcon } from "@chakra-ui/icons";
import SearchBar from "./SearchBar";
import "./style/Playlist.scss";
import AddVoterModal from "./AddVoterModal";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
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


export default function VotingPlaylist({
  setOpenPlaylistType,
  playlistID,
  spotifyPlaylistID,
  playlistInfo,
  spotifyTrackIDs,
  track,
  chooseTrack,
  setPlayingTrack,

}) {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openAddVoterModal, setOpenAddVoterModal] = useState(false);
  const accessToken = JSON.parse(localStorage.getItem("access_token"));
  const [songsInfo, setSongsInfo] = useState();
  const [value, setValue] = useState(null);
  const userID = JSON.parse(localStorage.getItem('userID'));

  function handlePlay(trackURI) {
    let uriObj = { uri: trackURI };
    setPlayingTrack(uriObj);
  }

  const getTrackFromSpotify = async (spotifyTrackIDs) => {
    const { data } = await axios.get(`https://api.spotify.com/v1/tracks/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        ids: spotifyTrackIDs,
      },
    });

    setSongsInfo(data.tracks);
  };

  const getTrack = (spotifyTrackIDs) => {
    getTrackFromSpotify(spotifyTrackIDs);
  };

  useEffect(() => {
    if (spotifyTrackIDs.length > 0) {
      getTrack(spotifyTrackIDs);
    }
  }, [spotifyTrackIDs]);


  const setUserTrackRating = (userID, newValue, spotifyTrackID, playlistID) => {
    axios.post(`http://localhost:3001/playlist/${playlistID}/addTrackRating`, { userID, newValue, spotifyTrackID, playlistID })
      .then(function({ data }) {
      })
      .catch(function(error) {
        console.log(error);
      });
  };

let songs;

if (songsInfo) {
  songs = songsInfo.map((song, index) => {
    return (
      <Tr key={song.id}>
        <Td>
          {" "}
          <Button
            className="play-button"
            onClick={() => handlePlay(song.uri)}
          >
            <PlayArrowIcon />
          </Button>{" "}
        </Td>
        <Td>{index + 1}</Td>
        <Td>{song.name}</Td>
        <Td>{song.artists[0].name}</Td>
        <Td>Username</Td>
        <Td> dateAdded </Td>
        <Td>
          {" "}
          <Typography component="legend"></Typography>
          <Rating name="half-rating" precision={0.5}
            value={value}
            onChange={(event, newValue) => { setValue(newValue); setUserTrackRating(userID, newValue, song.id, playlistID); }}
          />
        </Td>
      </Tr>
    );
  })
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
            <p> Voters: 5</p>
          </div>
        </div>
      </section>
    </Box>
    <Button className="edit-button">
      <EditIcon />
    </Button>

    <div>
      <Button
        className="add-user-button"
        onClick={() => setOpenAddVoterModal(true)}
      >
        <PersonAddIcon />
      </Button>
    </div>

    {openAddVoterModal && (
      <AddVoterModal
        setOpenAddVoterModal={setOpenAddVoterModal}
        playlistID={playlistID}
        spotifyPlaylistID={spotifyPlaylistID}
      />
    )}

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
            <Tr> Play </Tr>
            <Th>#</Th>
            <Th>Title</Th>
            <Th>Artist</Th>
            <Th>Added By</Th>
            <Th isNumeric>Date Added</Th>
            <Th isNumeric>Rating</Th>
          </Tr>
        </Thead>
        <Tbody>{songs}</Tbody>
      </Table>
    </TableContainer>
  </>
);
}
