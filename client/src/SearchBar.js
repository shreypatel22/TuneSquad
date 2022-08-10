import React, { useState, useEffect } from "react";
import {
  Container,
  Input,
  FormControl,
} from "@chakra-ui/react";
import axios from "axios";



export default function SearchBar() {
  const accessToken = JSON.parse(localStorage.getItem('access_token'));
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return
    axios
    .post("http://localhost:3001/searchbar", {
    accessToken, search
  })
    .then(res => {
      //(res.body.tracks.items)
      // res.body.tracks.items.map(track => {
        // return {
        //   artist: track.artists[0].name,
        //   title: track.name,
        //   uri: track.uri,
        //   albumUrl: track.albumUrl.images
        // }
      // })
    })
  }, [search])

  return (
    <div>
      <Container className="d-flex flex-column py-2">
        <FormControl>
          <Input
            type="search"
            placeholder="Search Songs/Artists"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FormControl>
      </Container>
    </div>
  );
}
