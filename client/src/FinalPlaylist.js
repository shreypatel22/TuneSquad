////////////// INDIVIDUAL PLAYLIST FEATURES //////////

import React, { useState } from 'react';
import {
  Box,
  Button
} from '@chakra-ui/react';
import './style/PlaylistModal.scss';
import axios from 'axios';
import PlaylistItem from './PlaylistItem';
import SearchBar from './SearchBar';

// useContext (since this isnt a parent/child relation)
// axios
// that will sotre info in context and the db
// then the PlaylistContainer will access this context and dynamic render components

export default function Playlist({ setOpenPlaylistType }) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const accessToken = JSON.parse(localStorage.getItem('access_token'));
  const [openSearchBar, setOpenSearchBar] = useState(false)

  return (
    <>
      <Box>
        <img
          className="playlist-item-image"
          src="https://i.scdn.co/image/ab67706c0000bebb485cbbef86d7f7fb3fb6128e"
          alt="Playlist"
        />
        <p> Playlist 1</p>
        <div className="playlist-info">
          <p> Songs: 100</p>
          <p> Voters: 5</p>
        </div>
      </Box>
      {openSearchBar && <SearchBar setOpenSearchBar={setOpenSearchBar} />}
      <Button onClick={() => setOpenSearchBar(true)}>
        Search for a song
      </Button>
      <Button onClick={() => setOpenPlaylistType(false)}>
        voting
      </Button>
      <Button color='blue' onClick={() => setOpenPlaylistType(true)}>
        Final
      </Button>



    </>

  );
}; 