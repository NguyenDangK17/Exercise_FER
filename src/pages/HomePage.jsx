import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  Divider,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaShoppingCart, FaStar, FaHeart } from "react-icons/fa";

const LandingPage = () => {
  const bg = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const footerBg = useColorModeValue("teal.500", "teal.700");
  const iconColor = useColorModeValue("blue.400", "blue.200");

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bgImage="url('https://sundanceorchids.com/wp-content/uploads/2016/09/orchid-header.jpg')"
        bgSize="cover"
        h="500px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        color="white"
        mt={-10}
      >
        <VStack spacing={4}>
          <Heading size="2xl" color="teal.300">
            Welcome to My Online Shop
          </Heading>
          <Text
            fontSize="xl"
            color={useColorModeValue("blackAlpha.800", "gray.300")}
          >
            Discover the best products at amazing prices!
          </Text>
          <Button colorScheme="teal" size="lg">
            Shop Now
          </Button>
        </VStack>
      </Box>

      {/* Promotions Section */}
      <Box p={8} bg={bg}>
        <Heading size="lg" textAlign="center" mb={6}>
          Exclusive Deals Just for You!
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          <Box
            textAlign="center"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            shadow="md"
            bg={cardBg}
          >
            <Icon as={FaHeart} boxSize={8} color="pink.400" />
            <Heading size="md" mt={4}>
              New Arrivals
            </Heading>
            <Text mt={2} color={textColor}>
              Check out the latest trends in our collection.
            </Text>
            <Button mt={4} colorScheme="teal" size="sm">
              Explore Now
            </Button>
          </Box>
          <Box
            textAlign="center"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            shadow="md"
            bg={cardBg}
          >
            <Icon as={FaStar} boxSize={8} color="yellow.400" />
            <Heading size="md" mt={4}>
              Best Sellers
            </Heading>
            <Text mt={2} color={textColor}>
              Don’t miss out on our top-rated products.
            </Text>
            <Button mt={4} colorScheme="teal" size="sm">
              See Best Sellers
            </Button>
          </Box>
          <Box
            textAlign="center"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            shadow="md"
            bg={cardBg}
          >
            <Icon as={FaShoppingCart} boxSize={8} color={iconColor} />
            <Heading size="md" mt={4}>
              Clearance Sale
            </Heading>
            <Text mt={2} color={textColor}>
              Grab your favorite items at unbeatable prices.
            </Text>
            <Button mt={4} colorScheme="teal" size="sm">
              Shop Sale
            </Button>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Testimonials Section */}
      <Box p={8} bg={useColorModeValue("teal.50", "gray.900")}>
        <Heading size="lg" textAlign="center" mb={6}>
          What Our Customers Say
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          <Box
            textAlign="center"
            p={6}
            borderWidth="1px"
            borderRadius="lg"
            shadow="md"
            bg={cardBg}
          >
            <Text fontSize="lg" fontStyle="italic">
              "Absolutely fantastic! The quality is unmatched and the service
              was impeccable."
            </Text>
            <Text mt={4} fontWeight="bold" color={textColor}>
              - Emily R.
            </Text>
          </Box>
          <Box
            textAlign="center"
            p={6}
            borderWidth="1px"
            borderRadius="lg"
            shadow="md"
            bg={cardBg}
          >
            <Text fontSize="lg" fontStyle="italic">
              "I found exactly what I needed and got it delivered on time.
              Highly recommend!"
            </Text>
            <Text mt={4} fontWeight="bold" color={textColor}>
              - Michael S.
            </Text>
          </Box>
          <Box
            textAlign="center"
            p={6}
            borderWidth="1px"
            borderRadius="lg"
            shadow="md"
            bg={cardBg}
          >
            <Text fontSize="lg" fontStyle="italic">
              "Great variety and amazing discounts! I’m always coming back for
              more."
            </Text>
            <Text mt={4} fontWeight="bold" color={textColor}>
              - Sarah L.
            </Text>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Newsletter CTA */}
      <Box
        p={8}
        bg={useColorModeValue("gray.900", "black")}
        color="white"
        textAlign="center"
      >
        <Heading size="lg" mb={4}>
          Subscribe to Our Newsletter
        </Heading>
        <Text mb={6}>
          Get the latest updates on new arrivals, promotions, and exclusive
          deals!
        </Text>
        <Flex justify="center">
          <Input
            placeholder="Enter your email"
            size="lg"
            width="300px"
            mr={4}
            bg="white"
            color="black"
            _placeholder={{ color: "gray.500" }}
          />
          <Button colorScheme="teal" size="lg">
            Subscribe
          </Button>
        </Flex>
      </Box>

      {/* Footer */}
      <Box bg={footerBg} color="white" p={4} textAlign="center">
        <Divider
          mb={4}
          borderColor={useColorModeValue("teal.700", "teal.300")}
        />
        <Text fontSize="sm">© 2024 My Online Shop. All rights reserved.</Text>
      </Box>
    </Box>
  );
};

export default LandingPage;
