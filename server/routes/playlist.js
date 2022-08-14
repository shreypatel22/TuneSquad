require("dotenv").config();
const express = require("express");
const router = express.Router();
const {
  getPlaylistInfoByID,
  getVotingPlaylistSongs,
  addRating,
} = require("./helper_functions");

module.exports = (db) => {
  router.get("/:playlistID", (req, res) => {
    const playlistID = req.params.playlistID;

    getPlaylistInfoByID(db, playlistID).then((data) => {
      const playlistInfo = { ...data };
      res.json({ playlist: playlistInfo });
    });

    router.get("/:playlistID/getSongsVoting", (req, res) => {
      getVotingPlaylistSongs(db, playlistID).then((data) => {
        let spotifyTrackIDs = [];
        for (const song of data) {
          spotifyTrackIDs.push(song.spotify_track_id);
        }

        res.json({ spotifyTrackIDs: spotifyTrackIDs.join(",") });
      });
    });

    router.post("/:playlistID/addTrackRating", (req, res) => {
      console.log("BACKEND IS GETTING CALLEd");
      const { userID, value, spotifyTrackID } = req.body;
      console.log(req.body, "THESE ARE pARASM");
      addRating(db, userID, value, spotifyTrackID).then((data) => {});
    });
  });
  return router;
};
