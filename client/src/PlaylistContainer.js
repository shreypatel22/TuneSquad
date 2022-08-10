/////////// HOMEPAGE VIEW OF ALL PLAYLISTS //////////////
import { propNames } from "@chakra-ui/react";
import PlaylistItem from "./PlaylistItem"


// 1. get the data (db)
// 2. mantain states ()
  // useState chagnes based on how many items are in the database
// use hooks and api calls

// const [playlists, setPlaylists] = useState()



// react router setup


export default function PlaylistContainer(props) {
  
  return(
    <PlaylistItem code={props.code} setOpenPlaylist={props.setOpenPlaylist}/>
  )
}