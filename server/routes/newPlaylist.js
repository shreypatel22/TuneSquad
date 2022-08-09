require("dotenv").config();
const express = require("express");
const router = express.Router();
const spotifyWebApi = require("spotify-web-api-node");
const bodyParser = require("body-parser");

module.exports = () => {
  router.post("/", (req, res) => {
    // console.log(req.body)
    const { playlistName, coverURL, description, accessToken } = req.body;

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
          console.log(data);
          const uri = data.body.uri;
          const playlistID = uri.slice(17);
          res.json({playlistID});

          // spotifyApi
          //   .uploadCustomPlaylistCoverImage(
          //     playlistID,
          //     coverURL
          //   )
          //   .then(
          //     function (data) {
          //       console.log("Playlsit cover image uploaded!");
          //     },
          //     function (err) {
          //       console.log("Something went wrong! Cover", err);
          //     }
          //   );
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  });
  return router;
};
