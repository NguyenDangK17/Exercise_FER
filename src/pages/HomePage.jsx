import React, { useEffect, useState } from "react";
import { Orchids } from "../assets/ListOfOrchids";
import {
  Box,
  Badge,
  Image,
  SimpleGrid,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import OrchidModal from "../components/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = "https://6693578bc6be000fa07af327.mockapi.io/orchid";

export default function HomePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrchid, setSelectedOrchid] = useState(null);
  const navigation = useNavigate();
  const [orchids, setOrchids] = useState([]);

  useEffect(() => {
    const fetchOrchid = async () => {
      await axios
        .get(baseUrl)
        .then((res) => {
          setOrchids(res.data);
          console.log("Fetch Orchid successfully");
        })
        .catch((err) => console.log(err.message));
    };

    fetchOrchid();
  }, []);

  const handleOpenModal = (orchid) => {
    setSelectedOrchid(orchid);
    onOpen();
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        // m={4}
        mr={10}
      >
        <Box />
        <Button onClick={() => navigation("/add")} colorScheme="teal">
          Add Orchid
        </Button>
      </Box>
      <SimpleGrid minChildWidth={325} spacing={5} m={10}>
        {orchids.map((orchid) => (
          <Box
            key={orchid.id}
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            borderColor="teal"
          >
            <Image
              style={{
                width: "100%",
                height: "300px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              src={orchid.image}
              alt={orchid.orchidName}
            />
            <Box p="5">
              <Box
                display="flex"
                alignItems="baseline"
                justifyContent="space-between"
              >
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  mr="4"
                >
                  {orchid.category} &bull; {orchid.origin}
                </Box>
                <Badge borderRadius="full" px="2" colorScheme="teal">
                  {orchid.isNatural === true ? "Natural" : ""}
                </Badge>
              </Box>

              <Box
                mt="1"
                fontWeight="bold"
                as="h2"
                lineHeight="tight"
                noOfLines={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {orchid.orchidName}
              </Box>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <StarIcon
                        fontSize={14}
                        ml={0.5}
                        key={i}
                        color={i < orchid.rating ? "teal.500" : "gray.300"}
                      />
                    ))}
                </Box>
                <Button
                  _hover="none"
                  justifyContent="space-around"
                  border="none"
                  bg="none"
                  onClick={() => handleOpenModal(orchid)}
                >
                  View more
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      {selectedOrchid && (
        <OrchidModal
          orchid={selectedOrchid}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
}
