/////////// HOMEPAGE VIEW OF ALL PLAYLISTS //////////////
import PlaylistItem from "./PlaylistItem"


// 1. get the data (db)
// 2. mantain states ()
  // useState chagnes based on how many items are in the database
// use hooks and api calls

// const [playlists, setPlaylists] = useState()



// react router setup


// get allPlaylists (select *) (done on app lvl so you can pass playlists down)
// create a default UseState
// useeffect to pull db (useeffect has the db helper)
  // set it to useState
  // map to generate playlistitems

export default function PlaylistContainer(code) {
  
  return(
    <PlaylistItem code={code} />
  )
}