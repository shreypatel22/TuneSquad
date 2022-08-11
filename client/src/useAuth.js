import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const [username, setUsername ] = useState();
  const [userID, setUserID] = useState();

  useEffect(() => {

    if(code) {
      axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        localStorage.setItem("access_token", JSON.stringify(res.data.accessToken));        
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        setUsername(res.data.name)
        localStorage.setItem("username", JSON.stringify(res.data.name));  
        setUserID(res.data.userID)
        console.log('userIDD', res.data.userID)
        localStorage.setItem("userID", JSON.stringify(res.data.userID));
        window.history.pushState({}, null, "/");
        // window.location = "/";
      })
      .catch(() => {
        window.location = "/";
      });
    }

  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then(res => {
          setAccessToken(res.data.accessToken)
          localStorage.setItem("access_token", JSON.stringify(res.data.accessToken));
          setExpiresIn(res.data.expiresIn)
        })
        .catch((err) => {
          console.log(err)
          window.location = "/"
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])


  return {accessToken, setAccessToken, refreshToken, username};

}
