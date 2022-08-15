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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  ChakraProvider,
} from "@chakra-ui/react";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useDisclosure } from "@chakra-ui/react";




export default function SongRow({song, index, playlistID, setPlayingTrack }) {
  const [rating, setRating] = React.useState()
  const userID = JSON.parse(localStorage.getItem("userID"));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  function handlePlay(trackURI) {
    let uriObj = { uri: trackURI };
    setPlayingTrack(uriObj);
  }


  const handleDeleteTrack = (playlistID, spotifyTrackID) => {
    axios
      .post(`http://localhost:3001/playlist/${playlistID}/deleteTrack`, {
     playlistID,
     spotifyTrackID
      })
      .catch((err) => console.log(err));
  };

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
    <Tr key={index + 1}>
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
          <Td>
            <ChakraProvider>
              <DeleteIcon
                className="delete-icon"
                onClick={onOpen}
                color="#1eb3ff"
              />
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Delete Song
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure you want to delete? You can't undo this
                      action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          onClose(); handleDeleteTrack(playlistID, song.id)
                        }}
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </ChakraProvider>
          </Td>
        </Tr>
   </>
  );
}