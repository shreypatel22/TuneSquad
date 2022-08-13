require("dotenv").config();
const express = require("express");
const router = express.Router();
const { getPlaylistInfoByID, getCollaborators } = require("./helper_functions");

module.exports = (db) => {
  router.get("/:playlistID", (req, res) => {
    const playlistID = req.params.playlistID;

    getCollaborators(db, playlistID).then((collabData) => {
      let collabArray = [];
      for (const collab of collabData) {
        collabArray.push(collab.user_id);
      }
      getPlaylistInfoByID(db, playlistID).then((data) => {
        const playlistInfo = { ...data };
        res.json({ playlist: playlistInfo, collaborators: collabArray });
      });
    });
  });
  return router;
};
