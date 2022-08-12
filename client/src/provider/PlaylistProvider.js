import { createContext, useState } from 'react';
export const playlistContext = createContext();

export default function PlaylistProvider(props) {

  const [playlistID, setPlaylistID] = useState(null);
  const [playingTrack, setPlayingTrack] = useState();
  const [playlistInfo, setPlaylistInfo] = useState([]);
  const [openPlaylistType, setOpenPlaylistType] = useState(false);
  const [spotifyPlaylistID, setSpotifyPlaylistID] = useState(null);
  const [openPlaylist, setOpenPlaylist] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const data = {
    playlistID,
    playingTrack, 
    playlistInfo, 
    openPlaylistType, 
    spotifyPlaylistID, 
    openPlaylist,
    openSearchBar,
    search,
    searchResults,
    setPlaylistID,
    setPlayingTrack,
    setPlaylistInfo,
    setOpenPlaylistType,
    setSpotifyPlaylistID,
    setOpenPlaylist,
    setOpenSearchBar,
    setSearch,
    setSearchResults
  };
  
  return (
    <PlaylistProvider value={data}>
      {props.children}
    </PlaylistProvider>
  )
};