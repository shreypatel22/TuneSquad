require("dotenv").config();
const express = require("express");
const router = express.Router();
const spotifyWebApi = require("spotify-web-api-node");

module.exports = (db) => {
  router.get("/:playlistID", (req, res) => {
    const { spotifyPlaylistID, accessToken } = req.query;

    const spotifyApi = new spotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });

    spotifyApi.setAccessToken(accessToken);

    spotifyApi
      .getPlaylistTracks(spotifyPlaylistID, {
        offset: 0,        
        fields: "items",
      })
      .then(
        function (data) {
          console.log("The playlist contains these tracks", data.body);
          for (const trackInfo of data.body.items) {
            console.log(trackInfo.track)
          }          
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  });
  return router;
};
