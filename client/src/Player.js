import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import './style/Playlist.scss';

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);
  useEffect(() => setPlay(true), [trackUri]);
  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      initialVolume={20}
      callback={state => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
      
      styles={{
        bgColor: ' #494e75',
        color: '#ee5d88',
        trackNameColor: 'white',
        trackArtistColor: 'white',
        }}

    />

  );
}