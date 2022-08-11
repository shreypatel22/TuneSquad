/////////// HOMEPAGE VIEW OF ALL PLAYLISTS //////////////
import PlaylistItem from "./PlaylistItem";


export default function PlaylistContainer({ code, playlists }) {
  console.log("playlistsCon", playlists);
  // console.log('playlistID', playlists[0].id)

  let playlistItems;

  if (playlists) {
    // console.log('playlistID', playlists[0].id)
    playlistItems = playlists.map((playlist) => {
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
      {playlistItems}
    </div>
  );
}
