import './style/SideNav.scss';
import React, { useState, useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import { EditIcon, Search2Icon, TriangleDownIcon } from "@chakra-ui/icons";
import "./style/Playlist.scss";
import AddVoterModal from "./AddVoterModal";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Tr,
  Td,

} from "@chakra-ui/react";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import axios from "axios";



export default function SongRow({song, index, playlistID, setPlayingTrack }) {
  const [rating, setRating] = React.useState()
  const userID = JSON.parse(localStorage.getItem("userID"));

  function handlePlay(trackURI) {
    let uriObj = { uri: trackURI };
    setPlayingTrack(uriObj);
  }

  const setUserTrackRating = (userID, newValue, spotifyTrackID, playlistID) => {
    axios
      .post(`http://localhost:3001/playlist/${playlistID}/addTrackRating`, {
        userID,
        newValue,
        spotifyTrackID,
        playlistID,
      })
      .then(function ({ data }) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
   <>
    <Tr>
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
            <Rating
              name={song.uri}
              precision={0.5}
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
                setUserTrackRating(userID, newValue, song.id, playlistID);
              }}
            />
          </Td>
          <Td><DeleteIcon className="delete-icon"/></Td>
        </Tr>
   </>
  );
}