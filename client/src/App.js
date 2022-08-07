import './App.scss';
import Login from './Login';
import Dashboard from './Dashboard';
import PlaylistNameList from './PlaylistNameList';
import PlaylistItems from './PlaylistItems';

const code = new URLSearchParams(window.location.search).get('code')
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
          <Dashboard code={code} />
          <PlaylistNameList />
        </nav>
      </section>
      <section className="content-display">
        <PlaylistItems/>
      </section>
    </main>
    )
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
        <section className="content-display">
       
        </section>
      </main>
    );
  }
}

