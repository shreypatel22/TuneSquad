require("dotenv").config();
const express = require("express");
const router = express.Router();
const spotifyWebApi = require("spotify-web-api-node");
const bodyParser = require("body-parser");

module.exports = () => {
  router.post("/", (req, res) => {
    const code = req.body.code;
    const spotifyApi = new spotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });

    spotifyApi.authorizationCodeGrant(code).then((authData) => {
      spotifyApi.setAccessToken(authData.body.access_token);
      spotifyApi.getMe().then((userData) => {
        res
          .json({
            name: userData.body.display_name,
            accessToken: authData.body.access_token,
            refreshToken: authData.body.refresh_token,
            expiresIn: authData.body.expires_in,
            userID: userData.body.id
          });
      })
        .catch((err) => {
          res.sendStatus(400);
        });
    });
  });
  return router;
};
