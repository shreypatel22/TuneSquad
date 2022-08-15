require("dotenv").config();
const express = require("express");
const router = express.Router();
const spotifyWebApi = require("spotify-web-api-node");
const bodyParser = require("body-parser");
const { addPlaylist, getDate } = require("./helper_functions");
const request = require("request-promise-native");

module.exports = (db) => {
  router.post("/", (req, res) => {
    const {
      playlistName,
      coverURL,
      description,
      accessToken,
      userID,
      username,
    } = req.body;

    const spotifyApi = new spotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });

    spotifyApi.setAccessToken(accessToken);

    spotifyApi
      .createPlaylist(playlistName, {
        description: description,
        public: true,
      })
      .then(
        function (data) {
          const uri = data.body.uri;
          const playlistID = uri.slice(17);

          const createdDate = getDate();

          addPlaylist(
            db,
            playlistName,
            coverURL,
            userID,
            playlistID,
            createdDate,
            username
          ).then((data) => {
            res.json({ newPlaylist: data.rows[0] });
          });
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  });
  return router;
};
