DROP TABLE IF EXISTS playlists CASCADE;

CREATE TABLE playlists (
id SERIAL PRIMARY KEY NOT NULL,
name VARCHAR(255) DEFAULT 'Playlist Name',
image_url VARCHAR, 
admin_id VARCHAR(255) NOT NULL,
spotify_playlist_id  VARCHAR(255) NOT NULL,
date_created DATE,
status VARCHAR(255) DEFAULT 'open',
admin_username VARCHAR(255) NOT NULL
);
