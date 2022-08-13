require("dotenv").config();
const express = require("express");
const router = express.Router();
const { getPlaylistInfoByID } = require("./helper_functions");

module.exports = (db) => {
  router.get("/:playlistID", (req, res) => {
    const playlistID = req.params.playlistID;

    getPlaylistInfoByID(db, playlistID).then(data => {
      const playlistInfo = { ...data };
      res.json({ playlist: playlistInfo });

    });
  });
  return router;
};
