import axios from "axios"
import React from "react"
import './Logout.scss'




export default function Logout({code, accessToken, setAccessToken}) {

  const logout = () => {
    axios.post('http://localhost:3001/logout', {})
    .then(function (response) {
      setAccessToken("")
      code = null;
      console.log(response);
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