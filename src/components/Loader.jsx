import { Spinner, Box } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor="rgba(255, 255, 255, 0.8)" // Optional: background color with opacity
      zIndex="999" // Ensure it appears above other elements
    >
      <Spinner size="xl" />
    </Box>
  );
};

export default Loader;
