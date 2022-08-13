require("dotenv").config();
const express = require("express");
const router = express.Router();
const spotifyWebApi = require("spotify-web-api-node");
const bodyParser = require("body-parser");
const { getVotingPlaylistSongs } = require("./helper_functions");



module.exports = (db) => {
  router.get("/", (req, res) => {
    const spotifyTrackID = req.params.spotify

    getVotingPlaylistSongs(db, playlistID)
      .then((data) => {
        console.log("INFO FROM CALLING THE ROuterRRR BACKEND: ", data)

      })
  });
  return router;
};
