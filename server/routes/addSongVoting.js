require("dotenv").config();
const express = require("express");
const router = express.Router();
const spotifyWebApi = require("spotify-web-api-node");
const bodyParser = require("body-parser");
const { addSongToVoting } = require("./helper_functions");



module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log("REQ BODY", req.body)
    const { spotifyTrackID, playlistID } = req.body;

    const spotifyApi = new spotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });

    addSongToVoting(db, playlistID, spotifyTrackID)
    .then((data) => {
        console.log("-----------------", data);
        // res.json({ newSong: data.rows[0] });
      }
    );

  });
  return router;
};
