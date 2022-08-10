require("dotenv").config();
const express = require("express");
const router = express.Router();
const { getAllPlaylists } = require("./helper_functions");

module.exports = (db) => {
  router.get("/:username", (req, res) => {

    console.log("user", req.params.user);
    const username = req.params.user;

    getAllPlaylists(db).then((data) => {
      console.log(data);
      res.json({data})
    });
  });
  return router;
};
