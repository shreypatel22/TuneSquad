const addPlaylist = (db, playlistName, username, playlistID, date) => {
  return db.query(`INSERT INTO playlists (name, admin_id, spotify_playlist_id, date_created, status) 
  VALUES ($1, $2, $3, $4, 'open')
  RETURNING *;`, [playlistName, username, playlistID, date])
    .catch((err) => console.log(err.message));
};

const getMyCreatedPlaylists = (db, userID) => {
  return db.query(`SELECT * FROM playlists WHERE admin_id = $1;`, [userID])
    .then(data => { return data.rows; });
};

const getMyVoterPlaylists = (db, userID) => {
  return db.query(`SELECT * FROM playlists JOIN voter_playlists ON playlist_id = playlists.id WHERE user_id = $1;`, [userID])
    .then(data => { return data.rows; });
};

const getAllMyPlaylists = (db, userID) => {
  const queries = [getMyCreatedPlaylists(db, userID), getMyVoterPlaylists(db, userID)];
  return Promise.all(queries).catch(err =>
    console.log("getAllMyPlaylists: ", err.message));
};

const getDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const date = `${year}-${month}-${day}`;
  return date;
};

const addSongToVoting = (db, playlistID, spotifyTrackID, username, dateAdded) => {
  return db.query(`INSERT INTO track_playlists (playlist_id, spotify_track_id, username, date_added) 
  VALUES ($1, $2, $3, $4)
  RETURNING *;`, [playlistID, spotifyTrackID, username, dateAdded])
    .catch((err) => console.log(err.message));
};

const getPlaylistInfoByID = (db, playlistID) => {
  return db.query(`SELECT * FROM playlists WHERE id = $1;`, [playlistID])
    .then(data => { return data.rows; });
};

const getVotingPlaylistSongs = (db, playlistID) => {
  return db.query(`SELECT * FROM track_playlists WHERE playlist_id = $1;`, [playlistID])
    .then(data => { return data.rows; });
};
const addVoter = (db, voterID, playlistID) => {
  return db.query(`INSERT INTO voter_playlists (user_id, playlist_id) 
  VALUES ($1, $2);`, [voterID, playlistID])
    .catch((err) => console.log(err.message));
};



const addRating = (db, userID, rating, spotifyTrackID, playlistID) => {
  getTrackPlaylistID = (db, spotifyTrackID, playlistID) => {
    return db.query(`SELECT * FROM track_playlists WHERE spotify_track_id = $1 AND WHERE playlist_id = $2;`, [spotifyTrackID, playlistID])
      .then(data => { return data.rows; }); // return track playlist id use inside the has rated to see if they match us it to add rating
  };
  hasRatedTrack = (db, user_id, spotifyTrackID) => {
    return db.query(`SELECT * FROM ratings JOIN track_playlists ON track_playlist_id = track_playlists.id WHERE user_id = $1 AND WHERE spotify_track_id = $2;`, [user_id, spotifyTrackID])
      .then(data => {
        if (data) {
          return true;
        }
        return false;
      });
  };
  return db.query(`INSERT INTO ratings (user_id, track_playlist_id, rating_number) VALUES ($1, $2)`, [userID, rating])
    .catch((err) => console.error(err));
};


module.exports = {
  addPlaylist,
  getMyCreatedPlaylists,
  getMyVoterPlaylists,
  getAllMyPlaylists,
  getDate,
  getPlaylistInfoByID,
  addSongToVoting,
  getVotingPlaylistSongs,
  addVoter,
  addRating
};