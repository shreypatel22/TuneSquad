import "./style/App.scss";
import "./style/PlaylistItem.scss";
import SideNav from "./SideNav";
import Login from "./Login";
import PlaylistContainer from "./PlaylistContainer";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Playlist from "./Playlist";
import PlaylistProvider from "./provider/PlaylistProvider";

// need state for code then useEffect then move the useAuth here
const code = new URLSearchParams(window.location.search).get("code");

export default function App() {
  const [playlists, setPlaylists] = useState([]);
  const [openPlaylist, setOpenPlaylist] = useState(false);
  
  
  useEffect(() => {
    const userID = JSON.parse(localStorage.getItem("userID"));
    if (!userID) return;
    axios
      .get(`http://localhost:3001/${userID}`)
      .then((res) => {
        setPlaylists((prev) => [...prev, ...res.data.playlists]);
      })
      .catch((err) => console.log(err));
  }, []);

  if (code) {
    return (
      <main className="layout">
        <PlaylistProvider>
          <section className="sidebar">
            <img
              className="sidebar--centered"
              src="images/logo.png"
              alt="TuneSquad"
              onClick={() => (window.location.href = "/")}
            />
            <nav className="sidebar__menu">
              <SideNav
                code={code}
                playlists={playlists}
                setPlaylists={setPlaylists}
              />
            </nav>
          </section>
          <section className="content-display">
            {openPlaylist ? (<Playlist />) : ( <PlaylistContainer code={code} playlists={playlists} />)}
          </section>
        </PlaylistProvider>
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
