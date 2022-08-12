/////////// HOMEPAGE VIEW OF ALL PLAYLISTS //////////////
import PlaylistItem from "./PlaylistItem";
import { SimpleGrid } from "@chakra-ui/react";
import playlistContext from "./provider/PlaylistProvider"
import { useContext } from "react";

export default function PlaylistContainer({ code, playlists}) {
  const {setOpenPlaylist} = useContext(playlistContext)

  let playlistItems;

  if (playlists) {
  
    playlistItems = playlists.map((playlist) => {
    
      let playlistID;
      if(playlist.playlist_id) {
        playlistID = playlist.playlist_id;
      } else{
        playlistID = playlist.id;
      }

      return (
        <PlaylistItem
          key={playlist.spotify_playlist_id}
          name={playlist.name}
          spotifyPlaylistID={playlist.spotify_playlist_id}
        />
      );
    });
  }

  return (
    <div>
      {/* <PlaylistItem code={code} /> */}
      <SimpleGrid minChildWidth="320px" onClick={() => setOpenPlaylist(true)}>
        {playlistItems}
      </SimpleGrid>
    </div>
  );
}
