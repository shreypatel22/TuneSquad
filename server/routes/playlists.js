require("dotenv").config();
const express = require("express");
const router = express.Router();
const { getMyCreatedPlaylists } = require("./helper_functions");

module.exports = (db) => {
  router.get("/:userID", (req, res) => {

    console.log("user", req.params);
    const userID = req.params.userID;

    getMyCreatedPlaylists(db, userID).then((data) => {
      console.log(data);
      res.json({playlists: data})
    });
  });
  return router;
};
