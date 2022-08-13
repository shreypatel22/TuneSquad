import { React, useState, useEffect } from 'react';
import FinalPlaylist from './FinalPlaylist';
import VotingPlaylist from './VotingPlaylist';
import Player from './Player';
import axios from 'axios';


export default function Playlist({ playlistID, spotifyPlaylistID }) {
  const accessToken = JSON.parse(localStorage.getItem('access_token'));
  const [openPlaylistType, setOpenPlaylistType] = useState(false);
  const [playingTrack, setPlayingTrack] = useState();
  const [playlistInfo, setPlaylistInfo] = useState([]);
  const [spotifyTrackIDs, setspotifyTrackIDs] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/playlist/${playlistID}`)
      .then((res) => {
        setPlaylistInfo(res.data.playlist[0]);

      })
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    axios
      .get(`http://localhost:3001/playlist/${playlistID}/getSongsVoting`)
      .then((res) => {
        setspotifyTrackIDs(res.data.spotifyTrackIDs);

      })
      .catch((err) => console.log(err));
  }, []);

  return (

    <div>
      {openPlaylistType ?
        <FinalPlaylist setOpenPlaylistType={setOpenPlaylistType} setPlayingTrack={setPlayingTrack} playlistID={playlistID} spotifyPlaylistID={spotifyPlaylistID} playlistInfo={playlistInfo} />
        :
        <VotingPlaylist spotifyTrackIDs={spotifyTrackIDs} setOpenPlaylistType={setOpenPlaylistType} setPlayingTrack={setPlayingTrack} playlistID={playlistID} spotifyPlaylistID={spotifyPlaylistID} playlistInfo={playlistInfo} />}
      <section className="playerBar">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </section>
    </div>



  );
}