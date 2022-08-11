import axios from "axios"
import React from "react"
import './style/Logout.scss'




export default function Logout({code, accessToken, setAccessToken}) {

  const logout = () => {
    axios.post('http://localhost:3001/logout', {})
    .then(function (response) {
      setAccessToken("")
      code = null;
      window.location.href = "/"    
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  return (          
    <div className='logout' onClick={logout}>
      Logout
    </div>          
  )
}