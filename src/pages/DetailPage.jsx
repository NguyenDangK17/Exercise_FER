import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Flex,
  Avatar,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import moment from "moment/moment";

const StarRating = ({ rating, setRating }) => {
  const handleClick = (newRating) => {
    setRating(newRating);
  };

  return (
    <Flex ml={3}>
      {[...Array(5)].map((_, index) => (
        <Box
          key={index}
          cursor="pointer"
          color={index < rating ? "yellow.500" : "gray.300"}
          onClick={() => handleClick(index + 1)}
        >
          ★
        </Box>
      ))}
    </Flex>
  );
};

const FeedbackCard = ({ rating, author, date, comment, onDelete }) => {
  return (
    <Box border="none" borderColor="gray.200" borderRadius="md" p={4} mb={4}>
      <Flex alignItems="start">
        <Avatar display="ab" />
        <Box ml={4} lineHeight={0.5}>
          <Text color="yellow.400">
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
          </Text>
          <Flex alignItems="center" mt={4}>
            <Text fontWeight="bold" mr={2}>
              {author}
            </Text>
            <Text color="gray.500" fontSize={14}>
              {moment(date).format("MMMM D, YYYY")}
            </Text>
            {/* Delete button only shown for feedback from logged-in user */}
            {onDelete && (
              <Button size="sm" colorScheme="red" ml={4} onClick={onDelete}>
                Delete
              </Button>
            )}
          </Flex>
          <Text mt={4}>{comment}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [feedback, setFeedback] = useState("");
  const [submittedFeedback, setSubmittedFeedback] = useState(false);
  const toast = useToast();
  const [orchidt, setOrchidt] = useState(null);

  const [feedbackData, setFeedbackData] = useState({
    comment: "",
    rating: 0,
  });

  useEffect(() => {
    const fetchOrchid = async () => {
      const response = await fetch(
        `https://6693578bc6be000fa07af327.mockapi.io/orchid/${id}`
      );
      const data = await response.json();
      setOrchidt(data);
    };

    fetchOrchid();
  }, [id]);

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
  const userFeedback = orchidt.feedbacks?.find((f) => f.authorId === user?.id);

  const handleFeedbackSubmit = async () => {
    if (!feedbackData.comment.trim()) {
      toast({
        title: "Feedback cannot be empty",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const newFeedback = {
      rating: feedbackData.rating,
      authorId: user.id,
      author: user.name,
      comment: feedbackData.comment,
      date: new Date().toISOString(),
    };

    try {
      // Fetch the current orchid data to get existing details and feedbacks
      const { data: currentOrchid } = await axios.get(
        `https://6693578bc6be000fa07af327.mockapi.io/orchid/${id}`
      );

      // Prepare updated data with new feedback
      const updatedOrchid = {
        ...currentOrchid,
        feedbacks: [...(currentOrchid.feedbacks || []), newFeedback],
      };

      // Send the updated orchid data via PUT request
      const response = await axios.put(
        `https://6693578bc6be000fa07af327.mockapi.io/orchid/${id}`,
        updatedOrchid,
        { headers: { "Content-Type": "application/json" } }
      );

      // Update local orchid state with the response data
      setOrchidt(response.data);
      setSubmittedFeedback(true);
      setFeedback(""); // Clear the input field

      toast({
        title: "Feedback submitted!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error submitting feedback",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // Function to handle feedback deletion
  const handleFeedbackDelete = async (feedbackId) => {
    try {
      const updatedFeedbacks = orchidt.feedbacks.filter(
        (feedback) => feedback.authorId !== feedbackId
      );

      const updatedOrchid = {
        ...orchidt,
        feedbacks: updatedFeedbacks,
      };

      // Send the updated orchid data via PUT request
      const response = await axios.put(
        `https://6693578bc6be000fa07af327.mockapi.io/orchid/${id}`,
        updatedOrchid,
        { headers: { "Content-Type": "application/json" } }
      );

      // Update local state with the response data
      setOrchidt(response.data);

      toast({
        title: "Feedback deleted!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error deleting feedback",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
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
      <Flex gap={6} py="30px">
        <Box w="50%">
          <Text fontSize="24px" fontWeight="500">
            Rating & Review
          </Text>
          {orchidt.feedbacks.length === 0 ? (
            <Text>There is no review yet</Text>
          ) : (
            orchidt.feedbacks.map((fback, index) => (
              <FeedbackCard
                key={index}
                {...fback}
                onDelete={
                  fback.authorId === user?.id
                    ? () => handleFeedbackDelete(fback.authorId)
                    : null
                }
              />
            ))
          )}
        </Box>
        <Box w="50%">
          <Text fontSize="24px" fontWeight="500">
            Review this product
          </Text>
          {user ? (
            userFeedback || submittedFeedback ? (
              <Box mt={10} p={5} borderWidth="1px" borderRadius="lg">
                <Text fontWeight="bold" fontSize="lg" color="gray.600">
                  You have already submitted feedback for this product.
                </Text>
                <Text mt={2}>{userFeedback?.feedback || feedback}</Text>
              </Box>
            ) : (
              <>
                <FormControl id="review">
                  <FormLabel
                    display="flex"
                    alignItems="baseline"
                    color="gray.500"
                  >
                    Your rating:
                    <StarRating
                      rating={feedbackData.rating}
                      setRating={(rating) =>
                        setFeedbackData((prev) => ({ ...prev, rating }))
                      }
                    />
                  </FormLabel>
                  <FormLabel>Your review</FormLabel>
                  <Textarea
                    placeholder="Write your review here..."
                    value={feedbackData.comment}
                    onChange={(e) => {
                      setFeedbackData((pre) => {
                        return { ...pre, comment: e.target.value };
                      });
                    }}
                  />
                </FormControl>
                <Button
                  mt={2}
                  colorScheme="teal"
                  onClick={handleFeedbackSubmit}
                >
                  Submit
                </Button>
              </>
            )
          ) : (
            <Text mt={10} color="red.500" fontSize="lg">
              Please log in to submit feedback.
            </Text>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
