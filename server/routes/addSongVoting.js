// require("dotenv").config();
// const express = require("express");
// const router = express.Router();
// const spotifyWebApi = require("spotify-web-api-node");
// const bodyParser = require("body-parser");

// const { addPlaylist, getDate } = require("./helper_functions");

// const request = require("request-promise-native");

// module.exports = (db) => {
//   router.post("/", (req, res) => {
//     // console.log(req.body)
//     const { playlistName, coverURL, description, accessToken, userID } =
//       req.body;

//     const spotifyApi = new spotifyWebApi({
//       redirectUri: process.env.REDIRECT_URI,
//       clientId: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//     });

//     addSongtoVoting(db, playlistName, userID, playlistID, createdDate).then(
//       (data) => {
//         console.log("------", data.rows[0]);
//         res.json({ newPlaylist: data.rows[0] });
//       }
//     );

//     return router;
//   });
// };
