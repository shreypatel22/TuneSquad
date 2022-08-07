import axios from "axios"
import React from "react"
import './Logout.scss'




export default function Logout({code, accessToken, setAccessToken}) {

  const logout = () => {
    axios.post('http://localhost:3001/logout', {})
    .then(function (response) {
      setAccessToken("")
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  return (      
    <div>
      <button className="login-button" onClick={logout}>
        Logout
      </button>

      <p>{accessToken}</p>

    </div>   
  )
}