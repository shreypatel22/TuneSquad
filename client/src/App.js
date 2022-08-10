import "./App.scss";
import "./PlaylistItem.scss";
import SideNav from "./SideNav";
import Login from "./Login";
import PlaylistContainer from "./PlaylistContainer";
import { useState, useEffect } from "react";
import axios from "axios";
// const db = require('../../server/configs/db.config');


const code = new URLSearchParams(window.location.search).get("code");
export default function App() {

  // const getAllPlaylists = (db) => {
  //   return db.query(`SELECT * FROM playlist;`)
  //     .then(data => {return data.rows})
  // }

  // useEffect(() => {
  //   getAllPlaylists(db)
  //     .then(data => console.log(data))
  // }, [playlists]);

  const [playlists, setPlaylists] = useState()
  const userID = JSON.parse(localStorage.getItem('userID'));

  useEffect(() => {
    axios
      .get(`http://localhost:3001/playlists/${userID}`)
      .then((res) => console.log(res.data.playlists))
      .catch((err) => console.log(err))
  }, [playlists]);


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
              <SideNav code={code} /> 
          </nav>
        </section>
        <section className="content-display">
          <PlaylistContainer code={code} />
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
