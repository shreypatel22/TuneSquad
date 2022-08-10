// require("dotenv").config();
// const express = require("express");
// const router = express.Router();
// const spotifyWebApi = require("spotify-web-api-node");

// module.exports = () => {
//   router.post("/", (req, res) => {
//     const { accessToken, search } = req.body;

//     const spotifyApi = new spotifyWebApi({
//       redirectUri: process.env.REDIRECT_URI,
//       clientId: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//     });
//     spotifyApi.setAccessToken(accessToken);
//     spotifyApi.searchTracks(search).then((data) => {
//       // console.log(data.body.tracks.items[0]);
//       data.body.tracks.items.map((track) => {
//         const smallestAlbumImage = track.album.images.reduce(
//           (smallest, image) => {
//             if (image.height < smallest.height) return image;
//             return smallest;
//           },
//           track.album.images[0]
//         );
//         return res.json({
//           artist: track.artists[0].name,
//           title: track.name,
//           uri: track.uri,
//           albumUrl: smallestAlbumImage.url,
//         });
//       });
//     });
//   });
//   return router;
// };
