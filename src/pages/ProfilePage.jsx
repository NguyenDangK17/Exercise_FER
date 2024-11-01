import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Stack,
  Heading,
  Avatar,
  useToast,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const UserProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    avatar: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://6693578bc6be000fa07af327.mockapi.io/account/${user.id}`
        );
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (user && user.id) fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleAvatarClick = () => {
    document.getElementById("avatarUpload").click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "xaemuxtra");

    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dcs6oxnew/image/upload",
        formData
      );
      setUserInfo({
        ...userInfo,
        avatar: response.data.secure_url,
      });
      toast({
        title: "Avatar updated.",
        description: "Your profile picture has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to upload avatar. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error uploading avatar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(
        `https://6693578bc6be000fa07af327.mockapi.io/account/${user.id}`,
        userInfo
      );
      toast({
        title: "Profile updated.",
        description: "Your information has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to update profile. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error updating user information:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminNavigate = () => {
    if (userInfo.role === "admin") {
      navigate("/admin");
    }
  };

  return (
    <VStack spacing={6} align="stretch" padding={6}>
      <Heading as="h1" size="lg">
        User Profile
      </Heading>
      {isLoading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : (
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="avatar">
              <Avatar
                src={userInfo.avatar}
                size="xl"
                onClick={handleAvatarClick}
                cursor="pointer"
              />
              <Input
                type="file"
                id="avatarUpload"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
            </FormControl>

            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </FormControl>

            <Button colorScheme="blue" type="submit" isLoading={isLoading}>
              Save Changes
            </Button>

            {userInfo.role === "admin" && (
              <Button
                colorScheme="teal"
                onClick={handleAdminNavigate}
                isLoading={isLoading}
              >
                Admin Panel
              </Button>
            )}
          </Stack>
        </form>
      )}
    </VStack>
  );
};

export default UserProfile;
