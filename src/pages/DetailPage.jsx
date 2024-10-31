// import React from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Orchids } from "../assets/ListOfOrchids";
// import {
//   Box,
//   Image,
//   Badge,
//   Text,
//   Button,
//   VStack,
//   HStack,
//   Divider,
// } from "@chakra-ui/react";
// import { StarIcon } from "@chakra-ui/icons";

// export default function DetailPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const orchidt = Orchids.find(
//     (orchid) => parseInt(orchid.id) === parseInt(id)
//   );

//   if (!orchidt) {
//     return (
//       <Box p={10} textAlign="center">
//         <Text fontSize="2xl" color="red.500">
//           Orchid not found.
//         </Text>
//         <Button mt={4} onClick={() => navigate("/natural")}>
//           Back to list
//         </Button>
//       </Box>
//     );
//   }

//   return (
//     <Box p={10}>
//       <Button mb={5} mt={-10} onClick={() => navigate("/natural")}>
//         &larr; Back
//       </Button>

//       <VStack
//         spacing={8}
//         display="flex"
//         flexDirection="row"
//         justifyContent="space-evenly"
//       >
//         <Image
//           src={orchidt.image}
//           alt={orchidt.name}
//           borderRadius="lg"
//           boxSize="400px"
//           objectFit="cover"
//           shadow="lg"
//         />
//         <Box w="50%" borderWidth="1px" borderRadius="lg" overflow="hidden">
//           <Box p={6}>
//             <Box display="flex" alignItems="baseline">
//               <Box
//                 color="gray.500"
//                 fontWeight="semibold"
//                 letterSpacing="wide"
//                 fontSize="xs"
//                 textTransform="uppercase"
//                 mr="4"
//               >
//                 {orchidt.category} &bull; {orchidt.origin}
//               </Box>
//               <Badge borderRadius="full" px="2" colorScheme="teal">
//                 {orchidt.isNatural === true ? "Natural" : ""}
//               </Badge>
//             </Box>
//             <Box
//               mt="1"
//               fontWeight="bold"
//               as="h2"
//               fontSize="2xl"
//               lineHeight="tight"
//               noOfLines={1}
//             >
//               {orchidt.name}
//             </Box>
//             <Box display="flex" mt="2" alignItems="center">
//               {Array(5)
//                 .fill("")
//                 .map((_, i) => (
//                   <StarIcon
//                     key={i}
//                     color={i < orchidt.rating ? "teal.500" : "gray.300"}
//                   />
//                 ))}
//               <Box as="span" ml="2" color="gray.600" fontSize="sm">
//                 {orchidt.rating} / 5
//               </Box>
//             </Box>

//             <Divider my={4} />

//             <HStack justify="space-between">
//               <Text fontWeight="bold">Origin:</Text>
//               <Text>{orchidt.origin}</Text>
//             </HStack>
//             <HStack justify="space-between">
//               <Text fontWeight="bold">Category:</Text>
//               <Text>{orchidt.category}</Text>
//             </HStack>
//             <HStack justify="space-between" mt={4}>
//               <Text fontWeight="bold">Color:</Text>
//               <Box
//                 bg={orchidt.color}
//                 width="30px"
//                 height="30px"
//                 borderRadius="full"
//                 border="1px solid gray"
//               />
//             </HStack>
//           </Box>
//         </Box>
//       </VStack>
//     </Box>
//   );
// }

import React, { useState, useContext } from "react";
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
  Textarea,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useAuth } from "../context/AuthContext"; // Assuming AuthContext provides user info

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // Access the logged-in user
  const [feedback, setFeedback] = useState("");
  const [submittedFeedback, setSubmittedFeedback] = useState(false); // Track if feedback has been submitted
  const toast = useToast();

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

  // Check if the user has already submitted feedback for this orchid
  const userFeedback = orchidt.feedbacks?.find((f) => f.userId === user?.id);

  const handleFeedbackSubmit = () => {
    if (!feedback.trim()) {
      toast({
        title: "Feedback cannot be empty",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    // Simulate feedback submission
    orchidt.feedbacks = [
      ...(orchidt.feedbacks || []),
      { userId: user.id, feedback },
    ];
    setSubmittedFeedback(true);

    toast({
      title: "Feedback submitted!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

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
            {/* Orchid details */}
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

            {/* Orchid attributes */}
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
      </VStack>

      {/* Feedback Section */}
      {user ? (
        userFeedback || submittedFeedback ? (
          <Box mt={10} p={5} borderWidth="1px" borderRadius="lg">
            <Text fontWeight="bold" fontSize="lg" color="gray.600">
              You have already submitted feedback for this orchid.
            </Text>
            <Text mt={2}>{userFeedback?.feedback || feedback}</Text>
          </Box>
        ) : (
          <Box mt={10} p={5} borderWidth="1px" borderRadius="lg">
            <FormControl>
              <FormLabel>Submit Your Feedback</FormLabel>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write your feedback here..."
                size="sm"
              />
              <Button mt={4} colorScheme="teal" onClick={handleFeedbackSubmit}>
                Submit Feedback
              </Button>
            </FormControl>
          </Box>
        )
      ) : (
        <Text mt={10} color="red.500" fontSize="lg">
          Please log in to submit feedback.
        </Text>
      )}
    </Box>
  );
}
