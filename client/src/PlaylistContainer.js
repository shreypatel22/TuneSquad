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
      let playlistID;
      if (playlist.playlist_id) {
        playlistID = playlist.playlist_id;
      } else {
        playlistID = playlist.id;
      }

      return (
        <PlaylistItem
          key={playlist.spotify_playlist_id}
          name={playlist.name}
          spotifyPlaylistID={playlist.spotify_playlist_id}
          setOpenPlaylist={setOpenPlaylist}
          playlistID={playlistID}
          setPlaylistID={setPlaylistID}
          setSpotifyPlaylistID={setSpotifyPlaylistID}
          coverImage={playlist.image_url}
        />
      );
    });
  }

  return (
    <div>
      <SimpleGrid minChildWidth="320px" >
        {playlistItems}
      </SimpleGrid>
    </div>
  );
}
