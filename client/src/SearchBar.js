import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Input,
  ChakraProvider,
} from "@chakra-ui/react";
import TrackSearchResult from "./TrackSearchResult";

const spotifyWebApi = require("spotify-web-api-node");
const spotifyApi = new spotifyWebApi({
  redirectUri: process.env.REDIRECT_URI,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

export default function SearchBar({
  setOpenSearchBar,
  spotifyPlaylistID,
  playlistID,
  getTrackIDs,
  setSavedSong,
}) {
  const accessToken = JSON.parse(localStorage.getItem("access_token"));
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [spotifyTrackID, setSpotifyTrackID] = useState("");
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { onClose } = useDisclosure();

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
            spotifyTrackID: track.id,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, accessToken]);


  return (
    <ChakraProvider>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={true}
        onClose={onClose}
        id="create-playlistform"
      >
        <ModalOverlay />
        <ModalContent backgroundColor="#03082b" color="white">
          <ModalHeader color="#ee5d88" fontWeight="bold">
            Search for a song
          </ModalHeader>
          <ModalCloseButton onClick={() => setOpenSearchBar(false)} />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                type="search"
                placeholder="Search Songs/Artists"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </FormControl>
            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
              {searchResults.map((track) => (
                <section>
                  <TrackSearchResult
                    track={track}
                    key={track.uri}
                    // chooseTrack={chooseTrack}
                    playlistID={playlistID}
                    spotifyPlaylistID={spotifyPlaylistID}
                    setSpotifyTrackID={setSpotifyTrackID}
                    spotifyTrackID={track.spotifyTrackID}
                    getTrackIDs={getTrackIDs}
                    setSavedSong={setSavedSong}
                  />

                  <hr />
                </section>
              ))}
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}
