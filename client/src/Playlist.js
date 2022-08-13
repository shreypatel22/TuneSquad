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

  useEffect(() => {
    axios
      .get(`http://localhost:3001/playlist/${playlistID}`)
      .then((res) => {
        console.log("HEREEE!!asdffff", res.data.playlist[0]);
        setPlaylistInfo(res.data.playlist[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  
  console.log("INFOOOOOOO", playlistInfo);
  
  return (
    <div>
      {openPlaylistType ? (
        <FinalPlaylist
          setOpenPlaylistType={setOpenPlaylistType}
          setPlayingTrack={setPlayingTrack}
          playlistID={playlistID}
          spotifyPlaylistID={spotifyPlaylistID}
          playlistInfo={playlistInfo}
        />
      ) : (
        <VotingPlaylist
          setOpenPlaylistType={setOpenPlaylistType}
          setPlayingTrack={setPlayingTrack}
          playlistID={playlistID}
          spotifyPlaylistID={spotifyPlaylistID}
          playlistInfo={playlistInfo}
        />
      )}
      <section className="playerBar">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </section>
    </div>
  );
}
