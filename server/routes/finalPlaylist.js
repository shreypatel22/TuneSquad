require("dotenv").config();
const express = require("express");
const router = express.Router();
const spotifyWebApi = require("spotify-web-api-node");
const { getPlaylistTracks } = require("./helper_functions");

module.exports = (db) => {
  const spotifyApi = new spotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  router.get("/:playlistID", (req, res) => {
    const { spotifyPlaylistID, accessToken } = req.query;
    const playlistID = req.params.playlistID;

    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getPlaylistTracks(spotifyPlaylistID, {
      offset: 0,
      fields: "items",
    });

   

    spotifyApi.getPlaylist(spotifyPlaylistID).then(
      function (data) {
        let allTracksInfo = [];
        for (const trackInfo of data.body.tracks.items) {
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
        getPlaylistTracks(db, playlistID).then((tracks) => {
          for (const trackInfo of allTracksInfo) {
            for (const track of tracks) {
              if (trackInfo.trackID == track.spotify_track_id) {
                trackInfo["rating"] = (Math.round(track.avg * 2) / 2).toFixed(1)
              }
            }
          }
          res.json({ allTracksInfo, snapshotID: data.body.snapshot_id });
        })
        
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  });

  router.post("/:playlistID", (req, res) => {
    const { spotifyPlaylistID, accessToken } = req.body;

    const playlistID = req.params.playlistID;

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

  router.post("/:playlistID/deleteTrack", (req, res) => {
    const { trackURI, snapshotID, accessToken, spotifyPlaylistID } = req.body;
    const tracks = [{ uri: trackURI }];
    const options = { snapshot_id: snapshotID };

    spotifyApi.setAccessToken(accessToken);

    spotifyApi
      .removeTracksFromPlaylist(spotifyPlaylistID, tracks, options)
      .then(
        (data) => {
          console.log("Tracks removed from playlist!");
        },
        (err) => {
          console.log("Something went wrong!", err);
        }
      );

      router.post("/:playlistID/followOnSpotify", (req, res) => {
        console.log("==========", req.body)
        const spotifyPlaylistID = req.body
        spotifyApi.followPlaylist(spotifyPlaylistID,
        {
          'public' : false
        }).then(function(data) {
           console.log('Playlist successfully followed privately!');
        }, function(err) {
          console.log('Something went wrong!', err);
        });
      })

  });
  return router;
};
