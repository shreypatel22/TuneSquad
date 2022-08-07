require('dotenv').config();
const express = require('express');
const router = express.Router();
const spotifyWebApi = require("spotify-web-api-node")
const bodyParser = require("body-parser")



module.exports = () => {
  router.post('/', (req, res) => {
    const code = req.body.code;
    const spotifyApi = new spotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    })

    spotifyApi.setAccessToken(req.body.accessToken)
    
    spotifyApi.getMe()
    .then((data) => {
      res.json({
        name: data.body.display_name,
        // profileImage: data.body.images[0].url,
      })
      console.log('Some information about the authenticated user', data.body);
    }).catch(err => {
      console.log('Something went wrong!', err);
    });
    
  });
  return router;
}
