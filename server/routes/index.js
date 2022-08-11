require("dotenv").config();
const express = require("express");
const router = express.Router();
const { getAllMyPlaylists } = require("./helper_functions");

module.exports = (db) => {
  router.get("/:userID", (req, res) => {
    const userID = req.params.userID;

    getAllMyPlaylists(db, userID).then((data) => {
      const allTracks = [...data[0], ...data[1]];
      res.json({ playlists: allTracks });
    });
  });
  return router;
};
