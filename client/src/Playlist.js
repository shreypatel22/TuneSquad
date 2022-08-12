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
  const [song, setSong] = useState([])
  const [songList, setSongList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/playlist/${playlistID}`)
      .then((res) => {
        console.log("HEREEE!!asdffff", res.data.playlist[0]);
        setPlaylistInfo(res.data.playlist[0]);

      })
      .catch((err) => console.log(err));
  }, []);


    useEffect(() => {
      axios
       .get(`http://localhost:3001/getSongsVoting}`)
       .then((res) => {   
         console.log("___________ GET SONG", res.data)     
         setSongList(res.data)

       }) 
       .catch((err) => console.log(err))
   }, []);


  const getTrack = async (e) => {
    e.preventDefault();
    console.log("it works")

    const { data } = await axios.get(`https://api.spotify.com/v1/tracks/3U4isOIWM3VvDubwSI3y7a`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      setSong(data)
    };




  console.log("INFOOOOOOO", song);
  return (

    <div onLoad={getTrack}>
    {openPlaylistType ?
      <FinalPlaylist setOpenPlaylistType={setOpenPlaylistType} setPlayingTrack={setPlayingTrack} playlistID={playlistID} spotifyPlaylistID={spotifyPlaylistID} playlistInfo={playlistInfo} />
      :
      <VotingPlaylist song={song} setOpenPlaylistType={setOpenPlaylistType} setPlayingTrack={setPlayingTrack} playlistID={playlistID} spotifyPlaylistID={spotifyPlaylistID} playlistInfo={playlistInfo} />}
      <section className="playerBar">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>
      </section>
    </div>



  );
}