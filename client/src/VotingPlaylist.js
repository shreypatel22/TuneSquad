import PersonAddIcon from "@mui/icons-material/PersonAdd";
import React, { useState, useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import { Search2Icon, TriangleDownIcon } from "@chakra-ui/icons";
import SearchBar from "./SearchBar";
import "./style/Playlist.scss";
import AddVoterModal from "./AddVoterModal";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import axios from "axios";
import SongRow from "./SongRow"

export default function VotingPlaylist({
  setOpenPlaylistType,
  playlistID,
  spotifyPlaylistID,
  playlistInfo,
  spotifyTrackIDs,
  track,
  chooseTrack,
  setPlayingTrack,
  collaborators,
  setCollaborators,
  playlistStatus,
  setPlaylistStatus,
  getTrackIDs
}) {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openAddVoterModal, setOpenAddVoterModal] = useState(false);
  const accessToken = JSON.parse(localStorage.getItem("access_token"));
  const [songsInfo, setSongsInfo] = useState();
  const [value, setValue] = React.useState();
  const userID = JSON.parse(localStorage.getItem("userID"));

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

  const getTrack = (spotifyTrackIDs, ) => {
    getTrackFromSpotify(spotifyTrackIDs);
  };

  useEffect(() => {
    getTrack(spotifyTrackIDs);
  });

  let songs;

  if (songsInfo) {
    songs = songsInfo.map((song, index) => {
      return (
        <SongRow song={song} key={index + 1} index={index} playlistID={playlistID}   setPlayingTrack={setPlayingTrack}        />
       
      );
    });
  }

  let collaboratorsNames = collaborators.join("");
 

  const createFinalPlaylist = () => {        
    const accessToken = JSON.parse(localStorage.getItem("access_token"));    
    axios.post(`http://localhost:3001/finalPlaylist/${playlistID}`, {spotifyPlaylistID, accessToken})
      .then(res => console.log(res))
      .catch((err) => console.log(err));
  };

  const changePlaylistStatus = (event) => {
    if (userID !== playlistInfo.admin_id) {
      alert("Only the admin can change playlist status!");
      return;
    }
    const { myValue } = event.currentTarget.dataset;
    setPlaylistStatus(myValue);
    
    console.log("vlaue", myValue)

    if (myValue === "closed") {
      createFinalPlaylist();
    }    

    axios
      .post(`http://localhost:3001/playlist/status/${playlistID}`, { myValue })
      .then((data) => {})
      .catch((err) => {
        console.log(err);
      });
  };



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
              <p> Voters: {collaboratorsNames}</p>
            </div>
          </div>
        </section>
      </Box>


      <Menu>
        <MenuButton
          className="playlist-status-button"
          as={Button}
          rightIcon={<TriangleDownIcon w={10} h={10} />}
        >
          Voting Status
        </MenuButton>
        <MenuList>
          <MenuItem
            className="dropdown-menu"
            data-my-value={"open"}
            onClick={changePlaylistStatus}
          >
            <div className="open-menu">Open</div>
          </MenuItem>
          <MenuItem
            className="dropdown-menu"
            data-my-value={"closed"}
            onClick={changePlaylistStatus}
          >
            <div className="close-menu">Close</div>
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
          <Button
            className="add-user-button"
            onClick={() => setOpenAddVoterModal(true)}
          >
            <PersonAddIcon />
          </Button>
      <hr className="divider" />
      {openSearchBar && (
        <SearchBar
          setOpenSearchBar={setOpenSearchBar}
          playlistID={playlistID}
          spotifyPlaylistID={spotifyPlaylistID}
          getTrackIDs={getTrackIDs}
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
              <Th> Play </Th>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Artist</Th>
              <Th isNumeric>Rating</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>{songs}</Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
