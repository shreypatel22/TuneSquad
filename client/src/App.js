import "./App.scss";
import PlaylistItem from "./PlaylistItem";
import "./PlaylistItem.scss";
import SideNav from "./SideNav";
import Login from "./Login";

const code = new URLSearchParams(window.location.search).get("code");
export default function App() {
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
          <PlaylistItem code={code} />
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
