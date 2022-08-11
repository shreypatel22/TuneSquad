const addPlaylist = (db, playlistName, username, playlistID, date) => {
  return db.query(`INSERT INTO playlists (name, admin_id, spotify_playlist_id, date_created, status) 
  VALUES ($1, $2, $3, $4, 'open')
  RETURNING *;`, [playlistName, username, playlistID, date])
    .catch((err) =>  console.log(err.message));  
};

const getMyCreatedPlaylists = (db, userID) => {
  return db.query(`SELECT * FROM playlists WHERE admin_id = $1;`, [userID])
    .then(data => {return data.rows})
}

const getMyVoterPlaylists = (db, userID) => {
  return db.query(`SELECT * FROM playlists JOIN voter_playlists ON playlist_id = playlists.id WHERE user_id = $1;`, [userID])
    .then(data => {return data.rows})
}

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

// const addSongVoting = (db, playlistName, username, playlistID, date) => {
//   console.log(playlistName, username, playlistID, date)
//   return db.query(`INSERT INTO track_playlist (playlist_id, spotify_track_id) 
//   VALUES ($1, $2, 'open')
//   RETURNING *;`, [playlistName, username, playlistID, date])
//     .catch((err) =>  console.log(err.message));  
// };


module.exports = {
  addPlaylist,
  getMyCreatedPlaylists,
  getMyVoterPlaylists,
  getAllMyPlaylists,
  getDate,
  // addSongVoting
}