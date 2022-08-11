////////////// INDIVIDUAL PLAYLIST FEATURES //////////

import React, { useState } from 'react';
import FinalPlaylist from './FinalPlaylist';
import VotingPlaylist from './VotingPlaylist';
import Player from './Player';

// useContext (since this isnt a parent/child relation)
// axios
// that will sotre info in context and the db
// then the PlaylistContainer will access this context and dynamic render components

export default function Playlist({playlistID, spotifyPlaylistID}) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const accessToken = JSON.parse(localStorage.getItem('access_token'));
  const [openPlaylistType, setOpenPlaylistType] = useState(false);
  const [playingTrack, setPlayingTrack] = useState();


  return (

    <div>
      {openPlaylistType ?
        <FinalPlaylist setOpenPlaylistType={setOpenPlaylistType} setPlayingTrack={setPlayingTrack} playlistID={playlistID} spotifyPlaylistID={spotifyPlaylistID}/>
        :
        <VotingPlaylist setOpenPlaylistType={setOpenPlaylistType} setPlayingTrack={setPlayingTrack}playlistID={playlistID} spotifyPlaylistID={spotifyPlaylistID}/>}
      <section className="playerBar">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </section>
    </div>



  );
}