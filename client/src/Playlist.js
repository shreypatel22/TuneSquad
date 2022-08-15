import { React, useState, useEffect } from "react";
import FinalPlaylist from "./FinalPlaylist";
import VotingPlaylist from "./VotingPlaylist";
import Player from "./Player";
import axios from "axios";

export default function Playlist({ playlistID, spotifyPlaylistID }) {
  const accessToken = JSON.parse(localStorage.getItem("access_token"));
  const [openPlaylistType, setOpenPlaylistType] = useState(false);
  const [playingTrack, setPlayingTrack] = useState();
  const [playlistInfo, setPlaylistInfo] = useState([]);
  const [spotifyTrackIDs, setspotifyTrackIDs] = useState([]);
  const [spotifyTrackIDsArray, setspotifyTrackIDsArray] = useState([]);
  const [songList, setSongList] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [playlistStatus, setPlaylistStatus] = useState("open");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/playlist/${playlistID}`)
      .then((res) => {
        setPlaylistInfo(res.data.playlist[0]);
        setCollaborators((prev) => [...prev, ...res.data.collaborators]);
      })
      .catch((err) => console.log(err));
  }, []);
  
  const getTrackIDs = () => {
    axios
      .get(`http://localhost:3001/playlist/${playlistID}/getSongsVoting`)
      .then((res) => {
        setspotifyTrackIDs(res.data.spotifyTrackIDs);
        setspotifyTrackIDsArray(res.data.spotifyTrackIDsArray);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getTrackIDs()
  }, []);

  // if (playlistStatus === "closed") {
  //   const accessToken = JSON.parse(localStorage.getItem("access_token"));    
  //   axios.post(`http://localhost:3001/finalPlaylist/${playlistID}`, {spotifyPlaylistID, accessToken})
  //     .then(res => console.log(res))
  //     .catch((err) => console.log(err));
  // }
  console.log(playlistStatus)
  return (
    <div>
      {openPlaylistType ? (
        <FinalPlaylist
          setOpenPlaylistType={setOpenPlaylistType}
          setPlayingTrack={setPlayingTrack}
          playlistID={playlistID}
          spotifyPlaylistID={spotifyPlaylistID}
          playlistInfo={playlistInfo}
          collaborators={collaborators}
        />
      ) : (
        <VotingPlaylist
          spotifyTrackIDs={spotifyTrackIDs}
          setOpenPlaylistType={setOpenPlaylistType}
          setPlayingTrack={setPlayingTrack}
          playlistID={playlistID}
          spotifyPlaylistID={spotifyPlaylistID}
          playlistInfo={playlistInfo}
          collaborators={collaborators}
          setCollaborators={setCollaborators}
          playlistStatus={playlistStatus}
          setPlaylistStatus={setPlaylistStatus}
          getTrackIDs={getTrackIDs}
        />
      )}
      {/* <button onClick={finalPlaylistTest}>Default</button> */}
      <section className="playerBar">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </section>
      <footer className="footer"></footer>
    </div>
  );
}
