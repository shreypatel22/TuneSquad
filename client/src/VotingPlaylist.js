import PersonAddIcon from "@mui/icons-material/PersonAdd";
import React, { useState, useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import { EditIcon, Search2Icon, TriangleDownIcon } from "@chakra-ui/icons";
import SearchBar from "./SearchBar";
import "./style/Playlist.scss";
import AddVoterModal from "./AddVoterModal";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
  collaborators,
  setCollaborators,
  playlistStatus,
  setPlaylistStatus,
}) {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openAddVoterModal, setOpenAddVoterModal] = useState(false);
  const accessToken = JSON.parse(localStorage.getItem("access_token"));
  const [value, setValue] = React.useState();
  const [songsInfo, setSongsInfo] = useState();

  const userID = JSON.parse(localStorage.getItem('userID'));

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

  let songs;
  if (songsInfo) {
    songs = songsInfo.map((song, index) => {
      console.log("SONG BITCHES", song.name);
      return (
        <Tr key={song.id}>
          <Td>
            {" "}
            {/* <Button
            className="play-button"
            onClick={() => handlePlay(track.trackURI)}
          > */}
            {/* <PlayArrowIcon />
          </Button>{" "} */}
          </Td>
          <Td>{index + 1}</Td>
          <Td>{song.name}</Td>
          <Td>{song.artists[0].name}</Td>
          <Td>Username</Td>
          <Td> date added </Td>
          <Td>
            {" "}
            <Typography component="legend"></Typography>
            <Rating name="read-only" value={value} readOnly />
          </Td>
        </Tr>
      );
    });
  }

  let collaboratorsNames = collaborators.join(", ");

  const changePlaylistStatus = (event) => {
    if (userID !== playlistInfo.admin_id) {
      alert("Only the admin can change playlist status!");
      return
    }
    
    console.log("ran")
    const { myValue } = event.currentTarget.dataset;
    setPlaylistStatus(myValue);

    axios
      .post(`http://localhost:3001/playlist/status/${playlistID}`, { myValue })
      .then((data) => {
        // console.log("status changed", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(playlistInfo.admin_id);

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
              <p> Admin: {playlistInfo.admin_username}</p>
              <p> Collaborators: {collaboratorsNames}</p>
              <p> Songs: 100</p>
              <p> Voters: {collaborators.length}</p>
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

      <Menu>
        <MenuButton as={Button} rightIcon={<TriangleDownIcon />}>
          Playlist Status
        </MenuButton>
        <MenuList>
          <MenuItem data-my-value={"open"} onClick={changePlaylistStatus}>
            Open
          </MenuItem>
          <MenuItem data-my-value={"closed"} onClick={changePlaylistStatus}>
            Close
          </MenuItem>
        </MenuList>
      </Menu>

      {openAddVoterModal && (
        <AddVoterModal
          setOpenAddVoterModal={setOpenAddVoterModal}
          playlistID={playlistID}
          spotifyPlaylistID={spotifyPlaylistID}
          setCollaborators={setCollaborators}
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
                {songs}
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
