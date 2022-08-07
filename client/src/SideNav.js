import './SideNav.scss';
import Login from './Login';
import PlaylistSidebar from './PlaylistSidebar';
import PlaylistItems from './PlaylistItems';
import UserProfile from './UserProfile';


export default function SideNav({code}) {
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
          <UserProfile code={code} />
          <PlaylistSidebar />
        </nav>
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