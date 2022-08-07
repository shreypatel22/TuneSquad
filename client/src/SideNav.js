import './SideNav.scss';
import Login from './Login';
import PlaylistSidebar from './PlaylistSidebar';
import PlaylistItem from './PlaylistItem';
import UserProfile from './UserProfile';
import { AddIcon } from '@chakra-ui/icons'



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
          <button className='new-playlist-button'>
          <AddIcon className='icon-button' w={18} h={18} />
          New Playlist
          </button>
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