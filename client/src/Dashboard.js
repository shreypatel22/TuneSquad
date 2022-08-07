import React from 'react';
import useAuth from './useAuth';
import Logout from './Logout';
import axios from "axios"

export default function Dashboard({code}) {
  const {accessToken, setAccessToken, refreshToken}= useAuth(code)
  const getUser = () => {
    axios.post('http://localhost:3001/getUser', {accessToken})
    .then(function (response) {      
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const refresh = () => {
    axios.post('http://localhost:3001/refresh', {refreshToken})
    .then(function (response) {      
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div>
      {/* {code} */}
      <Logout code={code} accessToken={accessToken} setAccessToken={setAccessToken}/>


      <button className="login-button" onClick={getUser}>
        Username
      </button>

      <button className="login-button" onClick={refresh}>
        Refresh
      </button>
    </div>
  )
}