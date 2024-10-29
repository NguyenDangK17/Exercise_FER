import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box textAlign="center" py={20} px={6}>
      <VStack spacing={4}>
        <Heading fontSize="9xl" color="teal.500">
          404
        </Heading>
        <Text fontSize="2xl" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color="gray.500" mb={6}>
          The page you are looking for does not seem to exist
        </Text>
        <Button colorScheme="teal" variant="solid" onClick={handleGoHome}>
          Go to Homepage
        </Button>
      </VStack>
    </Box>
  );
}

export default NotFoundPage;
