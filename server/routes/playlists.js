require("dotenv").config();
const express = require("express");
const router = express.Router();
const { 
  getMyCreatedPlaylists,
  getMyVoterPlaylists,
  getAllMyPlaylists 
} = require("./helper_functions");

module.exports = (db) => {
  router.get("/:userID", (req, res) => {
    const userID = req.params.userID;

    getAllMyPlaylists(db,userID).then(data => {
      // console.log('all', data[0]);
      // console.log('all', data[1]);
      let allTracks = [...data[0], ...data[1]];
      res.json({playlists: allTracks})
      // console.log('tracks', allTracks);
    })

    // getMyVoterPlaylists(db,userID).then(data => {
    //   console.log(data);
    // })

    // getMyCreatedPlaylists(db, userID).then((data) => {
    //   console.log('create', data);
    //   res.json({playlists: data})
    // });
  });
  return router;
};
