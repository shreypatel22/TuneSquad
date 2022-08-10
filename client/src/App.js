import { useState} from 'react'
import "./style/App.scss";
import "./style/PlaylistItem.scss";
import SideNav from "./SideNav";
import Login from "./Login";
import PlaylistContainer from "./PlaylistContainer";
import Playlist from './Playlist';
import SearchBar from "./SearchBar";


const code = new URLSearchParams(window.location.search).get("code");
export default function App() {
  const [openPlaylist, setOpenPlaylist] = useState(false)
  if (code) {
    return (
      <main className="layout">
        <section className="sidebar">
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="TuneSquad"
            onClick={() => window.location.href = "/"}
            />
          <nav className="sidebar__menu">
              <SideNav code={code} /> 
          </nav>
        </section>
        <section className="content-display">
          {openPlaylist ?
         <Playlist setOpenPlaylist={setOpenPlaylist} />
            :
          <PlaylistContainer code={code} setOpenPlaylist={setOpenPlaylist}/>}
        </section>
      </main>
    );
  } else {
    return (
      <main className="layout">
        <section className="sidebar">
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="TuneSquad"
          />
          <nav className="sidebar__menu">
            <Login />
          </nav>
        </section>
        <section className="content-display"></section>
      </main>
    );
  }
}
