# TuneSquad
TuneSquad is a voting based playlist creation app built using React, Spotify APIs, Node, Express and PostgreSQL.

# Contributors
- [Colleen Garvey](https://github.com/cogarvey)
- [Megan McBride](https://github.com/megsmcbride)
- [Shrey Patel](https://github.com/shreypatel22)


## Dependencies

- axios: ^0.27.2
- body-parser: ^1.20.0
- cookie-parser: ~1.4.4
- cors: ^2.8.5
- dotenv: ^16.0.1
- express: ~4.16.1
- framer-motion: ^7.0.0
- gsap: ^3.10.4
- morgan: ~1.9.1
- pg: ^8.7.3
- react: ^18.2.0
- react-dom: ^18.2.0
- react-scripts: 5.0.1
- react-spotify-web-playback: ^0.10.0
- sass: ^1.54.3
- spotify-web-api-node: ^5.0.2
- web-vitals: ^2.1.4
- @chakra-ui/icons: ^2.0.6
- @chakra-ui/modal: ^2.1.4
- @chakra-ui/react: ^2.2.6
- @emotion/react: ^11.10.0
- @emotion/styled: ^11.10.0
- @mui/icons-material: ^5.8.4
- @mui/material: ^5.10.0
  
## UI/UX

![Login Screen] https://user-images.githubusercontent.com/103383384/185939089-7be4ee1c-a7f8-4544-9624-f9d6b362eb93.mov




## Getting Started

1. Clone TuneSquad repo.
2. Create an '.env' using '.env.example' as reference
3. Log into [Spotify for Developers](https://developer.spotify.com/dashboard/login)
4. Update .env file with your client ID, secret and local information
    REDIRECT_URI=
    CLIENT_ID=
    CLIENT_SECRET=
    DB_HOST=localhost
    DB_USER=labber
    DB_PASSWORD=labber
    DB_DATABASE=tunesquad
5. Open two terminals navigating to server in one and client in the other
6. Install dependencies: `npm i`
7. Reset databased: `npm run db:reset`
8. Run server and client: `npm start`
