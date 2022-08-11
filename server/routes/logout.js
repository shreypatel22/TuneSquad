require('dotenv').config();
const express = require('express');
const router = express.Router();
const spotifyWebApi = require("spotify-web-api-node")




module.exports = () => {
  router.post('/', (req, res) => {   
    const spotifyApi = new spotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    })
    spotifyApi.resetCredentials();
    res.json({
      accessToken: spotifyApi.getAccessToken()
    })
    
    
  });
  return router;
}

