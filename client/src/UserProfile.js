import { useState, React } from 'react';
import useAuth from './useAuth';
import axios from 'axios';
import Logout from './Logout';

export default function UserProfile({code}) {
  const {accessToken, setAccessToken} = useAuth(code)
  const [username, setUsername] = useState()
  const getMe = () => {
    axios.post('http://localhost:3001/user', {accessToken})
    .then((response) => {      
      setUsername(response.data.name)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  return (

      <div>
        <button className="login-button" onClick={getMe}>
          {username}
        </button>
        <Logout code={code} accessToken={accessToken} setAccessToken={setAccessToken}/>
      </div>
  )
}