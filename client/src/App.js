import './App.scss';
import Login from './Login';
import PlaylistSidebar from './PlaylistSidebar';
import PlaylistItems from './PlaylistItems';
import UserProfile from './UserProfile';
import SideNav from './SideNav';

const code = new URLSearchParams(window.location.search).get('code')
export default function App() {
  return(
  <div>
    <SideNav code={code}/>
    <PlaylistItems code={code}/>
  </div>
  )
}