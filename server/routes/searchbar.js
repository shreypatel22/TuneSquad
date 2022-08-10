require('dotenv').config();
const express = require('express');
const router = express.Router();
const spotifyWebApi = require("spotify-web-api-node")


module.exports = () => {
  router.post('/', (req, res) => {   
    const { accessToken, search } = req.body;
    console.log(search)
    const spotifyApi = new spotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    })
    spotifyApi.setAccessToken(accessToken)
    spotifyApi.searchTracks(search)
    .then((data) => {
      console.log(data.body.tracks.items[0])
    })
    
  });
  return router;
}

