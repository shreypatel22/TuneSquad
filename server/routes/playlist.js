require("dotenv").config();
const express = require("express");
const router = express.Router();
const { getPlaylistInfoByID, getVotingPlaylistSongs } = require("./helper_functions");

module.exports = (db) => {
  router.get("/:playlistID", (req, res) => {
    const playlistID = req.params.playlistID;

    getPlaylistInfoByID(db, playlistID).then(data => {
      const playlistInfo = { ...data };
      res.json({ playlist: playlistInfo });

    });

    router.get("/:playlistID/getSongsVoting", (req, res) => {

      getVotingPlaylistSongs(db, playlistID)
      .then((data) => {
          let spotifyTrackIDs = []
          for (const song of data) {
            spotifyTrackIDs.push(song.spotify_track_id) 
          }
         
          res.json({ spotifyTrackIDs: spotifyTrackIDs.join(",")});

        });
    });

  });
  return router;
};
