import React from "react";
import { Box, Image, Heading, Text } from "@chakra-ui/react";
import AboutImage from "../assets/about.jpg";

export default function AboutPage() {
  return (
    <>
      <Box display="flex" alignItems="center" my="30px" px="200px">
        <Image src={AboutImage} maxW="30%" mr="40px" alt="About Us" />
        <Box>
          <Heading as="h1">About Us</Heading>
          <Text fontSize="18px" fontWeight="500" my={4}>
            Founded in 1986, OrchidShop, a family-owned & operated business has
            become a household name in states all over Vietnam as well as
            countries all over the world.
          </Text>
          <Text>
            We understand that each flower is not just a piece of branch, but a
            symbol of love, commitment, and personal style. With a diverse
            collection ranging from classic to modern designs, OrchidShop is
            dedicated to meeting the unique needs and tastes of every customer.
            Our flowers are carefully selected to ensure the highest quality,
            accompanied by prestigious international certifications.
          </Text>
          <Text mt={4}>
            Visit OrchidShop to experience a comfortable shopping environment,
            professional consultation services, and enjoy exclusive offers
            tailored just for you. We believe that every customer at OrchidShop
            will find the perfect ring to mark the most memorable moments of
            their lives.
          </Text>
        </Box>
      </Box>
    </>
  );
}
