require("dotenv").config();
const express = require("express");
const router = express.Router();
const spotifyWebApi = require("spotify-web-api-node");
const bodyParser = require("body-parser");
const {
  addPlaylist, 
  getDate
} = require('./helper_functions');

module.exports = (db) => {
  router.post("/", (req, res) => {
    // console.log(req.body)
    const { playlistName, coverURL, description, accessToken, userID } = req.body;

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
          // console.log(data);
          console.log('db', db);
          const uri = data.body.uri;
          const playlistID = uri.slice(17);          
          const createdDate = getDate();

          addPlaylist(db, playlistName, userID, playlistID, createdDate)
            .then(data => {
              // console.log('------')
              res.json({playlistName, userID, playlistID, createdDate});
            });      
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  });
  return router;
};


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