require("dotenv").config();
const express = require("express");
const router = express.Router();
const { addVoter } = require("./helper_functions");

module.exports = (db) => {
  router.post("/", (req, res) => {
    const { voterID, playlistID } = req.body;

    addVoter(db, voterID, playlistID).then((data) => {     
      // console.log("Backend Voter Added")
      res.json({ });
    });
  });
  return router;
};
