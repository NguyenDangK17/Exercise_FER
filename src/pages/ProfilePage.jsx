import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Textarea,
  Stack,
  Heading,
} from '@chakra-ui/react';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    bio: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    console.log('User information submitted:', user);
  };

  return (
    <VStack spacing={6} align="stretch" padding={6}>
      <Heading as="h1" size="lg">User Profile</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </FormControl>

          <FormControl id="phone">
            <FormLabel>Phone</FormLabel>
            <Input
              name="phone"
              value={user.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </FormControl>

          <FormControl id="bio">
            <FormLabel>Bio</FormLabel>
            <Textarea
              name="bio"
              value={user.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              size="sm"
            />
          </FormControl>

          <Button colorScheme="blue" type="submit">
            Save Changes
          </Button>
        </Stack>
      </form>
    </VStack>
  );
};

export default UserProfile;
