import './style/SideNav.scss';
import PlaylistSidebar from './PlaylistSidebar';
import UserProfile from './UserProfile';
import { AddIcon } from '@chakra-ui/icons'
import PlaylistModal from './PlaylistModal';
import { useContext, useState } from 'react';
import { playlistContext } from './provider/PlaylistProvider';


export default function SideNav({ code, playlists, setPlaylists }) {
const { setOpenModal, openModal } = useContext(playlistContext)

  return (
    <section className='sidebar-component'>
      {openModal && <PlaylistModal playlists={playlists} setPlaylists={setPlaylists} setOpenModal={setOpenModal}/>}
      <UserProfile code={code} />
      <button className='new-playlist-button' onClick={() => setOpenModal(true)}>
        <AddIcon className='icon-button' w={18} h={18} />
        New Playlist
      </button>
      <PlaylistSidebar />
    </section>
  );
}