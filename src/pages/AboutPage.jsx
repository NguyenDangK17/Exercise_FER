import React from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import AboutImage from "../assets/about.jpg";

export default function AboutPage() {
  const paddingX = useBreakpointValue({
    base: "20px",
    md: "100px",
    lg: "200px",
  });
  const imageMaxWidth = useBreakpointValue({
    base: "100%",
    md: "40%",
    lg: "30%",
  });
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const marginTop = useBreakpointValue({ base: "20px", md: "30px" });

  return (
    <Box
      display="flex"
      flexDirection={flexDirection}
      alignItems="center"
      my={marginTop}
      px={paddingX}
    >
      <Image
        src={AboutImage}
        maxW={imageMaxWidth}
        mb={{ base: 4, md: 0 }}
        mr={{ md: 8, lg: "40px" }}
        alt="About Us"
      />
      <Box textAlign={{ base: "center", md: "left" }}>
        <Heading as="h1" fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}>
          About Us
        </Heading>
        <Text fontSize={{ base: "16px", md: "18px" }} fontWeight="500" my={4}>
          Founded in 1986, OrchidShop, a family-owned & operated business has
          become a household name in states all over Vietnam as well as
          countries all over the world.
        </Text>
        <Text fontSize={{ base: "14px", md: "16px" }}>
          We understand that each flower is not just a piece of branch, but a
          symbol of love, commitment, and personal style. With a diverse
          collection ranging from classic to modern designs, OrchidShop is
          dedicated to meeting the unique needs and tastes of every customer.
          Our flowers are carefully selected to ensure the highest quality,
          accompanied by prestigious international certifications.
        </Text>
        <Text fontSize={{ base: "14px", md: "16px" }} mt={4}>
          Visit OrchidShop to experience a comfortable shopping environment,
          professional consultation services, and enjoy exclusive offers
          tailored just for you. We believe that every customer at OrchidShop
          will find the perfect ring to mark the most memorable moments of their
          lives.
        </Text>
      </Box>
    </Box>
  );
}
