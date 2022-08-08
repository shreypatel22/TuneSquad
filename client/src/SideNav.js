import './SideNav.scss';
import PlaylistSidebar from './PlaylistSidebar';
import UserProfile from './UserProfile';
import { AddIcon } from '@chakra-ui/icons'



export default function SideNav({code}) {
    return (
      <section className='sidebar-component'>
        <UserProfile code={code} />
        <button className='new-playlist-button'>
        <AddIcon className='icon-button' w={18} h={18} />
        New Playlist
        </button>
        <PlaylistSidebar /> 
      </section>

    );
  }