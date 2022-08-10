import "./App.scss";
import "./PlaylistItem.scss";
import SideNav from "./SideNav";
import Login from "./Login";
import PlaylistContainer from "./PlaylistContainer";
import { useState, useEffect } from "react";
import axios from "axios";


// need state for code then useEffect then move the useAuth here
const code = new URLSearchParams(window.location.search).get("code");

export default function App() {
  const [playlists, setPlaylists] = useState([])
  const userID = JSON.parse(localStorage.getItem('userID'));

  useEffect(() => {
    axios
      .get(`http://localhost:3001/playlists/${userID}`)
      .then((res) => {        
        setPlaylists((prev) => [...prev, ...res.data.playlists])
        console.log('res', res.data.playlists)        
      }) 
      .catch((err) => console.log(err))
  }, []);

  // console.log('playlists', playlists)

  if (code) {
    return (
      <main className="layout">
        <section className="sidebar">
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="TuneSquad"
          />
          <nav className="sidebar__menu">
              <SideNav code={code} playlists={playlists} setPlaylists={setPlaylists}/>
          </nav>
        </section>
        <section className="content-display">
          <PlaylistContainer code={code} playlists={playlists} />
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





// const db = require('../../server/configs/db.config');
  // const getAllPlaylists = (db) => {
  //   return db.query(`SELECT * FROM playlist;`)
  //     .then(data => {return data.rows})
  // }

  // useEffect(() => {
  //   getAllPlaylists(db)
  //     .then(data => console.log(data))
  // }, [playlists]);