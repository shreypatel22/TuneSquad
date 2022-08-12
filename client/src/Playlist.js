import { React, useState, useEffect, useContext } from 'react';
import FinalPlaylist from './FinalPlaylist';
import VotingPlaylist from './VotingPlaylist';
import Player from './Player';
import axios from 'axios';
import { playlistContext } from './provider/PlaylistProvider';


export default function Playlist() {
  const accessToken = JSON.parse(localStorage.getItem('access_token'));
  const { setPlaylistInfo, playingTrack, openPlaylistType, playlistID } = useContext(playlistContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/playlist/${playlistID}`)
      .then((res) => {
        console.log("HEREEE!!asdffff", res.data.playlist[0]);
        setPlaylistInfo(res.data.playlist[0]);

      })
      .catch((err) => console.log(err));
  }, []);

  return (

    <div>
      {openPlaylistType ? <FinalPlaylist /> : <VotingPlaylist />}
      <section className="playerBar">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </section>
    </div>



  );
}