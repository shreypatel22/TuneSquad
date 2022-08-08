import "./App.scss";
import "./PlaylistItem.scss";
import SideNav from "./SideNav";
import Login from "./Login";
import PlaylistContainer from "./PlaylistContainer";


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
