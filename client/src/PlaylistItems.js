import React from "react"
import './PlaylistItems.scss'
import { Container } from '@chakra-ui/react'




export default function PlaylistItem() {
  return (
    <Container className="playlistItem-container">
      <img
           className="playlist-item-image"
           src="https://i.scdn.co/image/ab67706c0000bebb485cbbef86d7f7fb3fb6128e"
           alt="Playlist"
         />
    </Container>
 
  )
}