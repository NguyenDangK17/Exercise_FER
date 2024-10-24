import React from "react";
import { Orchids } from "../assets/ListOfOrchids";
import { Box, Badge, Image, SimpleGrid, Button } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function List() {
  const navigation = useNavigate();
  const specialOrchids = Orchids.filter((orchid) => orchid.isSpecial === true);

  return (
    <>
      <SimpleGrid minChildWidth={325} spacing={5} m={10}>
        {specialOrchids.map((orchid) => (
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
              alt={orchid.name}
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
                  Natural
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
                {orchid.name}
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
                  // onClick={() => handleOpenModal(orchid)}
                  onClick={() => navigation(`/detail/${orchid.id}`)}
                >
                  View more
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
}
