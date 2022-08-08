////////////////////// EACH INDIVIDUAL PLAYLIST ///////////
import React from "react";
import './PlaylistItem.scss';
import { Container, SimpleGrid, Box } from '@chakra-ui/react';




export default function PlaylistItem() {
  return (
    <div>
      <SimpleGrid minChildWidth='320px' >
        <Box className="playlistItem-container">
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
        <Box className="playlistItem-container">
        <img
          className="playlist-item-image"
          src="https://external-preview.redd.it/sZbgrdtFO8dxIIq-_hKMMqoOnjuIOaFIzyV6krgQeW0.jpg?auto=webp&s=79330a9e63308918190770d03ac55c4c391d7301"
          alt="Playlist"
        />
        <p> Playlist 2</p>
        <div className="playlist-info">
          <p> Songs: 50</p>
          <p> Voters: 4</p>
        </div>
        </Box>
        <Box className="playlistItem-container">
        <img
          className="playlist-item-image"
          src="https://www.listenspotify.com/uploaded_files/Thf_1586701254.PNG"
          alt="Playlist"
        />
        <p> Playlist 3</p>
        <div className="playlist-info">
          <p> Songs: 150</p>
          <p> Voters: 2</p>
        </div>
        </Box>
        <Box className="playlistItem-container">
        <img
          className="playlist-item-image"
          src="https://data.whicdn.com/images/324480905/original.jpg?t=1546110527"
          alt="Playlist"
        />
        <p> Playlist 4</p>
        <div className="playlist-info">
          <p> Songs: 200</p>
          <p> Voters: 5</p>
        </div>
        </Box>
        <Box className="playlistItem-container">
        <img
          className="playlist-item-image"
          src="https://i.pinimg.com/originals/9a/b9/f9/9ab9f9a5a1001e820af128b5c20f1b55.jpg"
          alt="Playlist"
        />
        <p> Playlist 5</p>
        <div className="playlist-info">
          <p> Songs: 40</p>
          <p> Voters: 2</p>
        </div>
        </Box>
        <Box className="playlistItem-container">
        <img
          className="playlist-item-image"
          src="https://external-preview.redd.it/WjUQwmgfF4wJplrvy5DNatmg8rOt_PIpQNgUjtN7dxM.jpg?auto=webp&s=c8b329a0e81dbcd33e5811c3d68c80837883f6d6"
          alt="Playlist"
        />
        <p> Playlist 6</p>
        <div className="playlist-info">
          <p> Songs: 35</p>
          <p> Voters: 3</p>
        </div>
        </Box>
      </SimpleGrid>
    </div>


  );
}