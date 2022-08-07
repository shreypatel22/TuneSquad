import './App.scss';
import PlaylistItem from './PlaylistItem';
import SideNav from './SideNav';

const code = new URLSearchParams(window.location.search).get('code')
export default function App() {
  return(
  <div>
    <SideNav code={code}/>
    <PlaylistItem code={code}/>
  </div>
  )
}