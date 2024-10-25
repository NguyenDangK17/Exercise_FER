import React from "react";
import {
  Box,
  Text,
  Stack,
  Link,
  IconButton,
  Input,
  Button,
  Heading,
  useColorMode,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const { colorMode } = useColorMode();

  return (
    <Box
      bg={colorMode === "light" ? "gray.100" : "gray.900"}
      color={colorMode === "light" ? "gray.700" : "gray.100"}
      py={10}
      px={4}
    >
      <Stack
        maxW="1200px"
        mx="auto"
        direction={{ base: "column", md: "row" }}
        spacing={8}
        justify="space-between"
      >
        {/* Branding and About */}
        <Box>
          <Heading as="h3" size="lg" mb={4}>
            OrchidShop
          </Heading>
          <Text fontSize="sm" mb={4}>
            Creating solutions for a better tomorrow. OrchidShop is committed to
            providing the best products and services to empower your journey.
          </Text>
          <Stack direction="row" spacing={4}>
            <IconButton
              as="a"
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
              icon={<FaFacebook />}
              bg="gray.700"
              _hover={{ bg: "teal.500" }}
              color="white"
            />
            <IconButton
              as="a"
              href="https://twitter.com"
              target="_blank"
              aria-label="Twitter"
              icon={<FaTwitter />}
              bg="gray.700"
              _hover={{ bg: "teal.500" }}
              color="white"
            />
            <IconButton
              as="a"
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
              icon={<FaInstagram />}
              bg="gray.700"
              _hover={{ bg: "teal.500" }}
              color="white"
            />
          </Stack>
        </Box>

        {/* Services Section */}
        <Box>
          <Heading as="h3" size="md" mb={4}>
            Services
          </Heading>
          <Stack>
            <Link href="#" _hover={{ color: "teal.400" }}>
              Web Development
            </Link>
            <Link href="#" _hover={{ color: "teal.400" }}>
              Mobile Apps
            </Link>
            <Link href="#" _hover={{ color: "teal.400" }}>
              Cloud Services
            </Link>
            <Link href="#" _hover={{ color: "teal.400" }}>
              Consulting
            </Link>
          </Stack>
        </Box>

        {/* Support Section */}
        <Box>
          <Heading as="h3" size="md" mb={4}>
            Support
          </Heading>
          <Stack>
            <Link href="#" _hover={{ color: "teal.400" }}>
              Help Center
            </Link>
            <Link href="#" _hover={{ color: "teal.400" }}>
              FAQ
            </Link>
            <Link href="#" _hover={{ color: "teal.400" }}>
              Contact Support
            </Link>
            <Link href="#" _hover={{ color: "teal.400" }}>
              Terms & Conditions
            </Link>
          </Stack>
        </Box>

        {/* Company Section */}
        <Box>
          <Heading as="h3" size="md" mb={4}>
            Company
          </Heading>
          <Stack>
            <Link href="#" _hover={{ color: "teal.400" }}>
              About Us
            </Link>
            <Link href="#" _hover={{ color: "teal.400" }}>
              Careers
            </Link>
            <Link href="#" _hover={{ color: "teal.400" }}>
              Blog
            </Link>
            <Link href="#" _hover={{ color: "teal.400" }}>
              Press
            </Link>
          </Stack>
        </Box>

        {/* Newsletter Subscription */}
        <Box>
          <Heading as="h3" size="md" mb={4}>
            Stay Connected
          </Heading>
          <Text fontSize="sm" mb={4}>
            Subscribe to our newsletter and stay updated on the latest news and
            offers.
          </Text>
          <Stack direction="row" spacing={2}>
            <Input
              placeholder="Enter your email"
              bg="gray.700"
              border="none"
              color="white"
              _placeholder={{ color: "gray.400" }}
            />
            <Button colorScheme="teal">Subscribe</Button>
          </Stack>
        </Box>
      </Stack>

      {/* Footer Bottom Section */}
      <Box borderTop="1px solid gray" pt={6} mt={8}>
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
        >
          <Text fontSize="sm">
            OrchidShop © {new Date().getFullYear()} All rights reserved.
          </Text>
          <Stack direction="row" spacing={4}>
            <Link href="#" _hover={{ color: "teal.400" }}>
              Privacy Policy
            </Link>
            <Link href="#" _hover={{ color: "teal.400" }}>
              Terms of Service
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
