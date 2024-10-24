import React from "react";
import {
  Box,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Text,
  Divider,
  Button,
} from "@chakra-ui/react";

const OrchidModal = ({ orchid, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Image
              src={orchid.image}
              alt={orchid.name}
              boxSize="200px"
              objectFit="cover"
              borderRadius="md"
              shadow="md"
            />
            <Box textAlign="center">
              <Text fontSize="lg" fontWeight="bold">
                {orchid.name}
              </Text>
              <Text fontSize="md" color="gray.500">
                {orchid.origin}
              </Text>
              <Divider my={2} />
              <HStack>
                <Text fontSize="md" fontWeight="bold">
                  Category:
                </Text>
                <Text>{orchid.category}</Text>

                <Text fontSize="md" fontWeight="bold">
                  Color:
                </Text>
                <Box
                  bg={orchid.color}
                  width="30px"
                  height="30px"
                  borderRadius="full"
                  border="1px solid gray"
                />
              </HStack>
            </Box>
          </VStack>
        </ModalBody>

        <Button colorScheme="blue" m={10} onClick={onClose} mt={4}>
          Close
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default OrchidModal;
