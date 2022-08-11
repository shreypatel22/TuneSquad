/////////// HOMEPAGE VIEW OF ALL PLAYLISTS //////////////
import PlaylistItem from "./PlaylistItem";
import { SimpleGrid } from "@chakra-ui/react";

export default function PlaylistContainer({
  code,
  playlists,
  setOpenPlaylist,
  setSpotifyPlaylistID,
  setPlaylistID,
}) {
  let playlistItems;

  if (playlists) {
    playlistItems = playlists.map((playlist) => {
      console.log(playlist.spotify_playlist_id);
      return (
        <PlaylistItem
          key={playlist.spotify_playlist_id}
          name={playlist.name}
          spotifyPlaylistID={playlist.spotify_playlist_id}
          playlistID={playlist.id}
          setOpenPlaylist={setOpenPlaylist}
          setPlaylistID={setPlaylistID}
          setSpotifyPlaylistID={setSpotifyPlaylistID}
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
