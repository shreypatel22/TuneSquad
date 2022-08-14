DROP TABLE IF EXISTS  ratings CASCADE;

CREATE TABLE ratings (
id SERIAL PRIMARY KEY NOT NULL,
track_playlist_id INTEGER REFERENCES track_playlists(id) ON DELETE CASCADE,
user_id VARCHAR(255) NOT NULL, 
rating_number DECIMAL
);
