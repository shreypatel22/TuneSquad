require("dotenv").config();
const express = require("express");
const router = express.Router();
const {
  getPlaylistInfoByID,
  getVotingPlaylistSongs,
  addRating,
  getTrackPlaylistsID,
  hasRatedTrack,
  getCollaborators,
  updatePlaylistStatus,
  updateRating,
  removeVotingTrack,
} = require("./helper_functions");

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
      const playlistID = req.params.playlistID;

      getVotingPlaylistSongs(db, playlistID).then((data) => {
        let spotifyTrackIDs = [];
        for (const song of data) {
          spotifyTrackIDs.push(song.spotify_track_id);
        }

        res.json({
          spotifyTrackIDs: spotifyTrackIDs.join(","),
          spotifyTrackIDsArray: spotifyTrackIDs,
        });
      });
    });

    router.post("/:playlistID/addTrackRating", (req, res) => {
      const { userID, newValue, spotifyTrackID, playlistID } = req.body;

      getTrackPlaylistsID(db, spotifyTrackID, playlistID).then(
        (trackPlaylistData) => {
          const trackPlaylistsID = trackPlaylistData;
          hasRatedTrack(db, userID, trackPlaylistsID).then((hasRatedData) => {
            const userHasRated = hasRatedData;
            if (userHasRated === false) {
              addRating(db, userID, trackPlaylistsID, newValue).then(
                (data) => {}
              );
            }
            updateRating(db, trackPlaylistsID, newValue, userID).then(
              (data) => {}
            );
          });
        }
      );
    });

    router.post("/status/:playlistID", (req, res) => {
      const playlistStatus = req.body.myValue;
      const playlistID = req.params.playlistID;

      updatePlaylistStatus(db, playlistStatus, playlistID).then((data) => {
        res.json({ data });
      });
    });

    router.post("/:playlistID/deleteTrack", (req, res) => {
      const playlistID = req.params.playlistID;
      const spotifyTrackID = req.body.spotifyTrackID;
      removeVotingTrack(db, spotifyTrackID, playlistID);
    });

  });
  return router;
};
