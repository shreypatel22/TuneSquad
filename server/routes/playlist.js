require("dotenv").config();
const express = require("express");
const router = express.Router();

const { getPlaylistInfoByID, getVotingPlaylistSongs, getCollaborators, updatePlaylistStatus } = require("./helper_functions");


module.exports = (db) => {
  router.get("/:playlistID", (req, res) => {
    const playlistID = req.params.playlistID;

    getCollaborators(db, playlistID).then((collabData) => {
      let collabArray = [];
      for (const collab of collabData) {
        collabArray.push(collab.username);
      }
      getPlaylistInfoByID(db, playlistID).then((data) => {
        const playlistInfo = { ...data };
        res.json({ playlist: playlistInfo, collaborators: collabArray });
      });
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

    router.post("/status/:playlistID", (req, res) => {
      const playlistStatus = req.body.myValue;
      const playlistID = req.params.playlistID;
           
      updatePlaylistStatus(db, playlistStatus, playlistID)
        .then((data) => {
          res.json({data})
        }); 
    });

  });
  return router;
};
