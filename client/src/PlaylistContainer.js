/////////// HOMEPAGE VIEW OF ALL PLAYLISTS //////////////
import PlaylistItem from "./PlaylistItem"


// 1. get the data (db)
// 2. mantain states ()
  // useState chagnes based on how many items are in the database
// use hooks and api calls

// const [playlists, setPlaylist] = useState()



export default function PlaylistContainer(code) {
  return(
    <PlaylistItem code={code} />
  )
}