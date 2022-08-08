DROP TABLE IF EXISTS  track_playlist CASCADE;

CREATE TABLE track_playlist (
id SERIAL PRIMARY KEY NOT NULL,
playlist_id INTEGER REFERENCES playlist(id) ON DELETE CASCADE,
spotify_track_id VARCHAR(255) NOT NULL 
);
