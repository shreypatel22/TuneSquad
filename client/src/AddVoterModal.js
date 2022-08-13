import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import axios from 'axios';

export default function AddVoterModal({ setOpenAddVoterModal, playlistID, setCollaborators }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [voterID, setVoterID] = useState();
  const [voterUsername, setVoterUsername] = useState();
 


  const addVoter = () => {
    console.log(voterUsername)
    setCollaborators((prev) => [...prev, ...voterUsername])
    axios.post('http://localhost:3001/addVoter', { voterID, playlistID, voterUsername })
      .then(function({ data }) {        
        setOpenAddVoterModal(false);
      })
      .catch(function(error) {
        console.log(error);
      });
  };


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
            <ModalHeader color="#ee5d88" fontWeight='bold'>Add Voter</ModalHeader>
            <ModalCloseButton onClick={() => setOpenAddVoterModal(false)} />
            <ModalBody pb={6}>
  
              <FormControl mt={4}>
                <FormLabel>Spotify UserID</FormLabel>
                <Input placeholder='Spotify UserID' onChange={(event) => setVoterID(event.target.value)} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Spotify Username</FormLabel>
                <Input placeholder='Spotify Username' name="spotify_username" onChange={(event) => setVoterUsername(event.target.value) } />
              </FormControl>

            </ModalBody>
            <ModalFooter>
              <Button backgroundColor='#3A406D' _hover={{ bg: '#50536b' }} color="#ee5d88" mr={3} onClick={addVoter}>
                Save
              </Button>
              <Button onClick={() => setOpenAddVoterModal(false)} backgroundColor='#3A406D' _hover={{ bg: '#50536b' }} color="#ee5d88" mr={3}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    </>
  );
}
