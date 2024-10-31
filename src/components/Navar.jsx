import {
  useColorMode,
  IconButton,
  Flex,
  Box,
  Text,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Avatar,
} from "@chakra-ui/react";
import { FaSun, FaMoon, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigation = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
    navigation("/");
  };

  if (
    window.location.pathname === "/login" ||
    window.location.pathname === "/signup"
  )
    return null;

  return (
    <>
      <Box
        bg={colorMode === "light" ? "gray.100" : "gray.900"}
        color={colorMode === "light" ? "gray.800" : "gray.100"}
        px={4}
        py={2}
        mb={10}
      >
        <Flex justify="space-between" align="center" w="100%">
          {/* Logo and primary navigation */}
          <Flex align="center">
            <svg
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              fill={colorMode === "light" ? "#000" : "#fff"}
              width="32px"
              height="32px"
              onClick={() => navigation("/")}
              cursor="pointer"
            >
              <g id="SVGRepo_iconCarrier">
                <path
                  fill={colorMode === "light" ? "#000" : "#fff"}
                  d="M277.15 15.205C156.242 16.415 55.302 138.49 97.855 259.738c.236-.898.495-1.78.74-2.672 2.014-44.925 29.754-87.052 72.382-111.033C240.472 96.4 349.52 103.243 482.07 207.91 441.497 139.717 395.89 98.6 331.764 64.86c25.326 1.366 52.64 1.44 83.797 6.826-44.575-40.27-92.906-56.936-138.41-56.48zM125.822 52.412c-137.746 41.46-140.07 297.526-7.592 355.668-26.982-5.33-52.944-14.213-75.92-26.867 70.023 139.78 335.9 106.928 329.42-81.266-17.214 37.204-52.435 67.6-97.572 79.705-35.122 9.42-70.577 6.236-100.363-6.76-98.026-39.283-154.31-188.008-47.97-320.48h-.003zm123.96 91.914c-12.187-.084-24.737 1.472-37.323 4.848-67.128 18.003-107.523 80.338-91.952 138.502 7.036 26.283 24.393 47.58 47.498 61.373 17.175 6.946 35.95 9.88 54.303 8.15 50.952-4.81 95.722-48.554 90.434-100.952-3.738-37.02-35.686-69.512-73.648-65.363-26.23 2.867-49.247 25.63-46.123 52.295 2.097 17.902 17.716 33.58 35.705 31.297h.002c11.602-1.472 21.745-11.662 20.197-23.002-.194-1.424-.618-2.803-1.21-4.096-2.036 2.385-4.785 4.204-8.044 5.077-8.567 2.296-17.376-2.79-19.672-11.357-2.294-8.568 2.79-17.373 11.36-19.668.49-.132.984-.235 1.477-.32l-.002-.01c.044-.007.087-.01.13-.016h.005c17.875-2.566 32.265 11.716 34.47 27.86h-.003c3.123 22.877-15.39 41.404-36.358 44.064-29.462 3.737-53.413-20.335-56.614-47.656-4.464-38.11 26.966-69.14 62.65-73.042 3.085-.337 6.134-.493 9.14-.478 45.104.222 80.722 38.92 85.126 82.54 4.628 45.855-21.593 85.602-59.184 106.435 65.427-18.976 104.47-80.37 89.12-137.714-12.652-47.26-58.668-78.407-111.485-78.77zm79.74 5.326c23.968 16.104 42.048 39.66 49.798 68.612.908 3.39 1.65 6.79 2.243 10.187 26.737 85.357-5.167 199.845-63.8 261.392C379.27 473.715 425.278 417.11 441.6 353.756c12.557 44.178 15.743 89.788 7.02 128.187 93.862-152.582 29.32-296.865-119.097-332.29z"
                ></path>
              </g>
            </svg>
            <Flex
              ml={8}
              as="nav"
              gap={8}
              align="center"
              display={{ base: "none", md: "flex" }} // Hide on mobile
            >
              <Text
                onClick={() => navigation("/")}
                cursor="pointer"
                fontWeight="bold"
                _hover={{ color: "blue.500" }}
              >
                Home
              </Text>
              <Text
                onClick={() => navigation("/natural")}
                cursor="pointer"
                fontWeight="bold"
                _hover={{ color: "blue.500" }}
              >
                Natural
              </Text>
              <Text
                onClick={() => navigation("/contact")}
                cursor="pointer"
                fontWeight="bold"
                _hover={{ color: "blue.500" }}
              >
                Contact
              </Text>
              <Text
                onClick={() => navigation("/about")}
                cursor="pointer"
                fontWeight="bold"
                _hover={{ color: "blue.500" }}
              >
                About Us
              </Text>
            </Flex>
          </Flex>

          {/* User actions and color mode toggle */}
          <Flex align="center" gap={4}>
            <IconButton
              aria-label="Toggle Dark Mode"
              icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
              onClick={toggleColorMode}
              isRound
              size="md"
            />
            <IconButton
              aria-label="Open Menu"
              icon={<FaBars />}
              onClick={onOpen}
              display={{ base: "inline-flex", md: "none" }} // Show only on mobile
            />
            {user ? (
              <>
                <Avatar src={user.avatar} size="md" />
                <Button
                  colorScheme="red"
                  variant="outline"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <Flex gap={2} display={{ base: "none", md: "flex" }}>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={() => navigation("/login")}
                >
                  Sign In
                </Button>
                <Button
                  colorScheme="teal"
                  onClick={() => navigation("/signup")}
                >
                  Sign Up
                </Button>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Box>

      {/* Drawer for mobile navigation */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <Flex direction="column" gap={4}>
              <Text
                onClick={() => {
                  navigation("/");
                  onClose();
                }}
                fontWeight="bold"
                cursor="pointer"
              >
                Home
              </Text>
              <Text
                onClick={() => {
                  navigation("/natural");
                  onClose();
                }}
                fontWeight="bold"
                cursor="pointer"
              >
                Natural
              </Text>
              <Text
                onClick={() => {
                  navigation("/contact");
                  onClose();
                }}
                fontWeight="bold"
                cursor="pointer"
              >
                Contact
              </Text>
              <Text
                onClick={() => {
                  navigation("/about");
                  onClose();
                }}
                fontWeight="bold"
                cursor="pointer"
              >
                About Us
              </Text>
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <Flex align="center" gap={2} w="100%">
              <IconButton
                aria-label="Toggle Dark Mode"
                icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
                onClick={toggleColorMode}
                isRound
                size="md"
              />
              {user ? (
                <Button
                  colorScheme="red"
                  variant="outline"
                  w="full"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              ) : (
                <Flex gap={2} w="full">
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    w="full"
                    onClick={() => {
                      navigation("/login");
                      onClose();
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    colorScheme="teal"
                    w="full"
                    onClick={() => {
                      navigation("/signup");
                      onClose();
                    }}
                  >
                    Sign Up
                  </Button>
                </Flex>
              )}
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
