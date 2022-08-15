const addPlaylist = (db, playlistName, userID, playlistID, date, username) => {
  return db
    .query(
      `INSERT INTO playlists (name, admin_id, spotify_playlist_id, date_created, status, admin_username) 
  VALUES ($1, $2, $3, $4, 'open', $5)
  RETURNING *;`,
      [playlistName, userID, playlistID, date, username]
    )
    .catch((err) => console.log(err.message));
};

const getMyCreatedPlaylists = (db, userID) => {
  return db
    .query(`SELECT * FROM playlists WHERE admin_id = $1;`, [userID])
    .then((data) => {
      return data.rows;
    });
};

const getMyVoterPlaylists = (db, userID) => {
  return db
    .query(
      `SELECT * FROM playlists JOIN voter_playlists ON playlist_id = playlists.id WHERE user_id = $1;`,
      [userID]
    )
    .then((data) => {
      return data.rows;
    });
};

const getAllMyPlaylists = (db, userID) => {
  const queries = [
    getMyCreatedPlaylists(db, userID),
    getMyVoterPlaylists(db, userID),
  ];
  return Promise.all(queries).catch((err) =>
    console.log("getAllMyPlaylists: ", err.message)
  );
};

const getDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const date = `${year}-${month}-${day}`;
  return date;
};

const addSongToVoting = (
  db,
  playlistID,
  spotifyTrackID,
  username,
  dateAdded
) => {
  return db
    .query(
      `INSERT INTO track_playlists (playlist_id, spotify_track_id, username, date_added) 
  VALUES ($1, $2, $3, $4)
  RETURNING *;`,
      [playlistID, spotifyTrackID, username, dateAdded]
    )
    .catch((err) => console.log(err.message));
};

const getPlaylistInfoByID = (db, playlistID) => {
  return db
    .query(`SELECT * FROM playlists WHERE id = $1;`, [playlistID])
    .then((data) => {
      return data.rows;
    });
};

const getVotingPlaylistSongs = (db, playlistID) => {
  return db
    .query(`SELECT * FROM track_playlists WHERE playlist_id = $1;`, [
      playlistID,
    ])
    .then((data) => {
      return data.rows;
    });
};

const getTrackPlaylistsID = (db, spotifyTrackID, playlistID) => {
  return db
    .query(
      `SELECT id FROM track_playlists WHERE spotify_track_id = $1 AND playlist_id = $2;`,
      [spotifyTrackID, playlistID]
    )
    .then((data) => {
      return data.rows[0].id;
    });
};

const hasRatedTrack = (db, userID, trackPlaylistsID) => {
  console.log("HAS RATED", userID);
  return db
    .query(
      `SELECT * FROM ratings WHERE user_id = $1 AND track_playlist_id = $2;`,
      [userID, trackPlaylistsID]
    )
    .then((data) => {
      if (data.rows.length > 0) {
        return true;
      }
      return false;
    });
};

const addRating = (db, userID, trackPlaylistsID, newValue) => {
  return db
    .query(
      `INSERT INTO ratings (user_id, track_playlist_id, rating_number) VALUES ($1, $2, $3) RETURNING *;`,
      [userID, trackPlaylistsID, newValue]
    )
    .then((data) => {})
    .catch((err) => console.error(err));
};

const addVoter = (db, voterID, playlistID, voterUsername) => {
  return db
    .query(
      `INSERT INTO voter_playlists (user_id, playlist_id, username) 
  VALUES ($1, $2, $3);`,
      [voterID, playlistID, voterUsername]
    )
    .catch((err) => console.log(err.message));
};

const getCollaborators = (db, playlistID) => {
  return db
    .query(`SELECT * FROM voter_playlists WHERE playlist_id = $1;`, [
      playlistID,
    ])
    .then((data) => {
      return data.rows;
    });
};

const updatePlaylistStatus = (db, status, playlistID) => {
  return db
    .query(`UPDATE playlists SET status = $1 WHERE id = $2 RETURNING *;`, [
      status,
      playlistID,
    ])
    .catch((err) => console.log(err.message));
};

const getPlaylistTracks = (db, playlistID) => {
  return db
    .query(
      `SELECT track_playlist_id, AVG(rating_number), spotify_track_id 
      FROM playlists 
      JOIN track_playlists on playlist_id = playlists.id
      JOIN ratings on track_playlist_id = track_playlists.id
      WHERE playlists.id = $1
      GROUP BY track_playlist_id, spotify_track_id;`,
      [playlistID]
    )
    .then((data) => {
      return data.rows;
    });
};

const updateRating = (db, trackPlaylistsID, newValue, userID) => {
  return db
    .query(
      `UPDATE ratings SET rating_number = $1 WHERE track_playlist_id = $2 AND userID = $3`,
      [newValue, trackPlaylistsID, userID]
    )
    .then((data) => {})
    .catch((err) => console.error(err));
};

const getPlaylistTracksTwo = (db) => {
  return db
    .query(
      `SELECT track_playlist_id, AVG(rating_number), spotify_track_id 
      FROM playlists 
      JOIN track_playlists on playlist_id = playlists.id
      JOIN ratings on track_playlist_id = track_playlists.id
      WHERE playlists.id = 4
      GROUP BY track_playlist_id, spotify_track_id;`
    )
    .then((data) => {
      return data.rows;
    });
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
  addRating,
  getTrackPlaylistsID,
  hasRatedTrack,
  getCollaborators,
  updatePlaylistStatus,
  getPlaylistTracks,
  updateRating,
};
