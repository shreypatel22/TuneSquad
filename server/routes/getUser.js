require('dotenv').config();
const express = require('express');
const router = express.Router();
const spotifyWebApi = require("spotify-web-api-node")


module.exports = () => {
  router.post('/', (req, res) => {   
    console.log(req.body.accessToken)
    const spotifyApi = new spotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    })
    // console.log('test', spotifyApi.getAccessToken());
    spotifyApi.setAccessToken(req.body.accessToken);
    
    spotifyApi.getMe()
      .then(function(data) {
        console.log('Some information about the authenticated user', data.body);
      }, function(err) {
        console.log('Something went wrong!', err);
      });
  });
  return router;
}
