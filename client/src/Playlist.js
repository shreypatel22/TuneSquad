////////////// INDIVIDUAL PLAYLIST FEATURES //////////

import React, { useState } from 'react';
import FinalPlaylist from './FinalPlaylist'
import VotingPlaylist from './VotingPlaylist'

// useContext (since this isnt a parent/child relation)
// axios
// that will sotre info in context and the db
// then the PlaylistContainer will access this context and dynamic render components

export default function Playlist() {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const accessToken = JSON.parse(localStorage.getItem('access_token'));
  const [openPlaylistType, setOpenPlaylistType] = useState(false)

  return (

    <div>
      {openPlaylistType ?
        <FinalPlaylist setOpenPlaylistType={setOpenPlaylistType} />
        :
      <VotingPlaylist setOpenPlaylistType={setOpenPlaylistType}/>}
      </div>
   
  );
}