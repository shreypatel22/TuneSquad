require("dotenv").config();
const express = require("express");
const router = express.Router();
const spotifyWebApi = require("spotify-web-api-node");
const bodyParser = require("body-parser");
const { addSongToVoting, getDate } = require("./helper_functions");



module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log("REQ BODY", req.body)
    const { spotifyTrackID, playlistID, username } = req.body;

    const spotifyApi = new spotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });

    const dateAdded = getDate();

    addSongToVoting(db, playlistID, spotifyTrackID, username, dateAdded)
    .then((data) => {
        res.json({ songAdded: data.rows[0] });
      }
    );
  });
  return router;
};
