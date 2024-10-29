import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function NotAuthorized() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box textAlign="center" py={20} px={6}>
      <VStack spacing={4}>
        <Heading fontSize="9xl" color="teal.500">
          401
        </Heading>
        <Text fontSize="2xl" mt={3} mb={2}>
          Permission Denied
        </Text>
        <Text color="gray.500" mb={6}>
          The page you are looking for cannot be accessed
        </Text>
        <Button colorScheme="teal" variant="solid" onClick={handleGoHome}>
          Go to Homepage
        </Button>
      </VStack>
    </Box>
  );
}

export default NotAuthorized;
