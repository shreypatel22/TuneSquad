require("dotenv").config();
const express = require("express");
const router = express.Router();
const spotifyWebApi = require("spotify-web-api-node");
const { getPlaylistTracks } = require("./helper_functions");

module.exports = (db) => {
  router.get("/:playlistID", (req, res) => {
    const { spotifyPlaylistID, accessToken } = req.query;

    const spotifyApi = new spotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });

    spotifyApi.setAccessToken(accessToken);

    spotifyApi
      .getPlaylistTracks(spotifyPlaylistID, {
        offset: 0,
        fields: "items",
      })
      .then(
        function (data) {
          let allTracksInfo = [];
          for (const trackInfo of data.body.items) {
            let indiviualTrackInfo = {};
            indiviualTrackInfo["trackID"] = trackInfo.track.id;
            indiviualTrackInfo["trackName"] = trackInfo.track.name;
            indiviualTrackInfo["trackArtist"] = trackInfo.track.artists[0].name;
            indiviualTrackInfo["dateAdded"] = trackInfo.added_at.slice(0, 10);
            indiviualTrackInfo[
              "trackURI"
            ] = `spotify:track:${trackInfo.track.id}`;
            allTracksInfo.push(indiviualTrackInfo);
          }
          res.json({ allTracksInfo });
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  });

  router.post("/:playlistID", (req, res) => {
    const { spotifyPlaylistID, accessToken } = req.body;

    const playlistID = req.params.playlistID;
    console.log(playlistID);

    getPlaylistTracks(db, playlistID).then((tracks) => {
      console.log(tracks);
      let passedTracksArray = [];
      for (const track of tracks) {
        if (track.avg > 2) {
          passedTracksArray.push(track.spotify_track_id);
        }
      }
      let formattedSpotifyTrackIDsArray = passedTracksArray.map(
        (id) => "spotify:track:" + id
      );
      console.log(formattedSpotifyTrackIDsArray);

      const spotifyApi = new spotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
      });

      spotifyApi.setAccessToken(accessToken);

      spotifyApi
        .addTracksToPlaylist(spotifyPlaylistID, formattedSpotifyTrackIDsArray)
        .then(
          function (data) {
            console.log("Added tracks to playlist!", data);
          },
          function (err) {
            console.log("Something went wrong!", err);
          }
        );
    });
  });
  return router;
};
