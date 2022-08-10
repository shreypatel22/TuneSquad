const addPlaylist = (db, playlistName, username, playlistID, date) => {
  console.log(playlistName, username, playlistID, date)
  return db.query(`INSERT INTO playlist (name, admin_id, spotify_playlist_id, date_created, status) 
  VALUES ($1, $2, $3, $4, 'open')
  RETURNING *;`, [playlistName, username, playlistID, date])
    .catch((err) =>  console.log(err.message));  
};

const getMyCreatedPlaylists = (db, userID) => {
  return db.query(`SELECT * FROM playlist WHERE admin_id = $1;`, [userID])
    .then(data => {return data.rows})
}

const getDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const date = `${year}-${month}-${day}`;
  return date;
};

module.exports = {
  addPlaylist,
  getMyCreatedPlaylists,
  getDate
}