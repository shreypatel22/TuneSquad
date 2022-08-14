DROP TABLE IF EXISTS  track_playlists CASCADE;

CREATE TABLE track_playlists (
id SERIAL PRIMARY KEY NOT NULL,
playlist_id INTEGER REFERENCES playlists(id) ON DELETE CASCADE,
spotify_track_id VARCHAR(255) NOT NULL,
username VARCHAR(255) NOT NULL,
date_added DATE NOT NULL 
);