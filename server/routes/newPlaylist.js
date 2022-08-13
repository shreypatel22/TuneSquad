require("dotenv").config();
const express = require("express");
const router = express.Router();
const spotifyWebApi = require("spotify-web-api-node");
const bodyParser = require("body-parser");
const { addPlaylist, getDate } = require('./helper_functions');
const request = require("request-promise-native");


module.exports = (db) => {
  router.post("/", (req, res) => {
    const { playlistName, coverURL, description, accessToken, userID, username } = req.body;

    const spotifyApi = new spotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });

    // const toBase64URL = () => {

    //   let jpgDataUrlPrefix = "data:image/png;base64,";

    //   request({
    //     url: coverURL,
    //     method: "GET",
    //     encoding: null, // This is actually important, or the image string will be encoded to the default encoding
    //   }).then((result) => {
    //     let imageBuffer = Buffer.from(result);
    //     let imageBase64 = imageBuffer.toString("base64");
    //     let imageDataUrl = jpgDataUrlPrefix + imageBase64;

    //     console.log("___________________", imageDataUrl);
    //   });
    // };

    // const base64URL = toBase64URL(coverURL);

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

          addPlaylist(db, playlistName, userID, playlistID, createdDate, username)
            .then(data => {
              res.json({newPlaylist: data.rows[0]});
            });      

          // res.json({ playlistID });

          // spotifyApi
          //   .uploadCustomPlaylistCoverImage(
          //     playlistID,
          //     base64URL
              
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