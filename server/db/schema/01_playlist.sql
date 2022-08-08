DROP TABLE IF EXISTS playlist CASCADE;

CREATE TABLE playlist (
id SERIAL PRIMARY KEY NOT NULL,
name VARCHAR(255) DEFAULT 'Playlist Name',
admin_id VARCHAR(255) NOT NULL,
spotify_playlist_id  VARCHAR(255) NOT NULL,
date_created DATE,
status VARCHAR(255) DEFAULT 'open'
);
