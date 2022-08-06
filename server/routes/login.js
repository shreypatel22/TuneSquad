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

    spotifyApi.authorizationCodeGrant(code).then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
      })
    }).catch(err => {
      res.sendStatus(400)
    })
    
  });
  return router;
}


