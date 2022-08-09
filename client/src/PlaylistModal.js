import React from 'react'
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
import './PlaylistModal.scss'

// useContext (since this isnt a parent/child relation)
// axios
// that will sotre info in context and the db
// then the PlaylistContainer will access this context and dynamic render components

export default function PlaylistModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

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
              <Input ref={initialRef} placeholder='Playlist Name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Playlist Cover Image URL</FormLabel>
              <Input placeholder='Playlist Cover Image URL' />
            </FormControl>
            
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input placeholder='Description' />
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