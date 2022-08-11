/////////// HOMEPAGE VIEW OF ALL PLAYLISTS //////////////
import PlaylistItem from "./PlaylistItem";
import { SimpleGrid } from "@chakra-ui/react";

export default function PlaylistContainer({
  code,
  playlists,
  setOpenPlaylist,
}) {
  console.log("playlistsCon", playlists);
  // console.log('playlistID', playlists[0].id)

  let playlistItems;

  if (playlists) {
    // console.log('playlistID', playlists[0].id)    
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
          setOpenPlaylist={setOpenPlaylist}
          playlistID={playlistID}
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
