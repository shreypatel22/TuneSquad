import React, {useState} from 'react'
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
  FormLabel,
  Input,
  Button,
  ChakraProvider
} from '@chakra-ui/react'
import axios from 'axios'

// useContext (since this isnt a parent/child relation)
// axios
// that will sotre info in context and the db
// then the PlaylistContainer will access this context and dynamic render components

export default function PlaylistModal({setOpenModal}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [playlistName, setPlaylistName] = useState()
  const [coverURL, setCoverURL] = useState()
  const [description, setDescription] = useState()
  const accessToken = JSON.parse(localStorage.getItem('access_token'));
 
  const savePlaylist = () => {
    axios.post('http://localhost:3001/newPlaylist', {playlistName, coverURL, description, accessToken})
    .then(function (response) {      
      console.log(response);      
      setOpenModal(false)
      // window.location.href = "/" 
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  return (
    <>     
      <ChakraProvider>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={true}
        onClose={onClose}
        className="create-playlistform"
      >
        <ModalOverlay />
        <ModalContent backgroundColor="#03082b" color="white">
          <ModalHeader color="#ee5d88" fontWeight='bold'>Create Your Playlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

            <FormControl>
              <FormLabel>Playlist Name</FormLabel>
              <Input ref={initialRef} placeholder='Playlist Name' onChange={(event) => setPlaylistName(event.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Playlist Cover Image URL</FormLabel>
              <Input placeholder='Playlist Cover Image URL' onChange={(event) => setCoverURL(event.target.value)} />
            </FormControl>
            
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input placeholder='Description' onChange={(event) => setDescription(event.target.value)} />
            </FormControl>

          </ModalBody>
          <ModalFooter>
            <Button backgroundColor='#3A406D' _hover={{ bg: '#50536b' }} color="#ee5d88" mr={3} onClick={savePlaylist}>
              Save
            </Button>
            <Button onClick={onClose} backgroundColor='#3A406D' _hover={{ bg: '#50536b' }} color="#ee5d88" mr={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </ChakraProvider>
    </>
  )
} 