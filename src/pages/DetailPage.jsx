import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Orchids } from "../assets/ListOfOrchids";
import {
  Box,
  Image,
  Badge,
  Text,
  Button,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const orchidt = Orchids.find(
    (orchid) => parseInt(orchid.id) === parseInt(id)
  );

  if (!orchidt) {
    return (
      <Box p={10} textAlign="center">
        <Text fontSize="2xl" color="red.500">
          Orchid not found.
        </Text>
        <Button mt={4} onClick={() => navigate("/natural")}>
          Back to list
        </Button>
      </Box>
    );
  }

  return (
    <Box p={10}>
      <Button mb={5} mt={-10} onClick={() => navigate("/natural")}>
        &larr; Back
      </Button>

      <VStack
        spacing={8}
        display="flex"
        flexDirection="row"
        justifyContent="space-evenly"
      >
        <Image
          src={orchidt.image}
          alt={orchidt.name}
          borderRadius="lg"
          boxSize="400px"
          objectFit="cover"
          shadow="lg"
        />
        <Box w="50%" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Box p={6}>
            <Box display="flex" alignItems="baseline">
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                mr="4"
              >
                {orchidt.category} &bull; {orchidt.origin}
              </Box>
              <Badge borderRadius="full" px="2" colorScheme="teal">
                {orchidt.isNatural === true ? "Natural" : ""}
              </Badge>
            </Box>
            <Box
              mt="1"
              fontWeight="bold"
              as="h2"
              fontSize="2xl"
              lineHeight="tight"
              noOfLines={1}
            >
              {orchidt.name}
            </Box>
            <Box display="flex" mt="2" alignItems="center">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < orchidt.rating ? "teal.500" : "gray.300"}
                  />
                ))}
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {orchidt.rating} / 5
              </Box>
            </Box>

            <Divider my={4} />

            <HStack justify="space-between">
              <Text fontWeight="bold">Origin:</Text>
              <Text>{orchidt.origin}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontWeight="bold">Category:</Text>
              <Text>{orchidt.category}</Text>
            </HStack>
            <HStack justify="space-between" mt={4}>
              <Text fontWeight="bold">Color:</Text>
              <Box
                bg={orchidt.color}
                width="30px"
                height="30px"
                borderRadius="full"
                border="1px solid gray"
              />
            </HStack>
          </Box>
        </Box>

        {/* <Box mt="4">
          <video width="100%" controls>
            <source
              src="https://www.youtube.com/watch?v=3k3l0NTv3Bk"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </Box> */}
      </VStack>
    </Box>
  );
}
