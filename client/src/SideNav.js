import './style/SideNav.scss';
import PlaylistSidebar from './PlaylistSidebar';
import UserProfile from './UserProfile';
import { AddIcon } from '@chakra-ui/icons'
import PlaylistModal from './PlaylistModal';
import { useState } from 'react';



export default function SideNav({ code, playlists, setPlaylists }) {
const [openModal, setOpenModal] = useState(false)

  return (
    <section className='sidebar-component'>
      {openModal && <PlaylistModal setOpenModal={setOpenModal} playlists={playlists} setPlaylists={setPlaylists}/>}
      <UserProfile code={code} />
      <button className='new-playlist-button' onClick={() => setOpenModal(true)}>
        <AddIcon className='icon-button' w={18} h={18} />
        New Playlist
      </button>
      <PlaylistSidebar playlists={playlists}/>
    </section>
  );
}