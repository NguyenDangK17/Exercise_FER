import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  FormControl,
  InputRightElement,
  Divider,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaEnvelope = chakra(FaEnvelope);

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password too short - should be 6 chars minimum")
    .required("Password is required"),
});

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const onGoogleSuccess = async (credentialResponse) => {
    var decoded;
    if (credentialResponse.credential) {
      decoded = jwtDecode(credentialResponse.credential);
      console.log(
        "SIGNIN SUCCESSFULLY. Google login user's email:",
        decoded.email
      );

      await fetch("https://6693578bc6be000fa07af327.mockapi.io/account")
        .then((res) => res.json())
        .then((data) => {
          var foundUserByEmail = data.find(
            (account) => account.email === decoded.email
          );
          if (foundUserByEmail) {
            sessionStorage.setItem("loginUserId", foundUserByEmail.name);
          } else {
            var registerUser = {
              email: decoded.email,
              name: decoded.name,
              picture: decoded.picture,
            };
            axios
              .post(
                "https://6693578bc6be000fa07af327.mockapi.io/account",
                registerUser
              )
              .then(() => {
                console.log(
                  "A new account has been created by email ",
                  decoded.email
                );
              })
              .catch((err) => {
                console.log("Error: ", err.response);
              });
            sessionStorage.setItem("loginUserId", newUserId);
          }
        })
        .catch((err) => console.log(err));
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      console.log("Not found data");
    }
    console.log("Login Successful: ", credentialResponse);
  };

  const onGoogleError = (err) => {
    console.log("Failed to sign up with Google: ", err.message);
  };

  const handleSignup = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await fetch(
        "https://6693578bc6be000fa07af327.mockapi.io/account"
      );
      const users = await response.json();

      const existingUser = users.find((user) => user.email === values.email);
      if (existingUser) {
        setErrors({ email: "Email is already registered." }); // Set the error message
      } else {
        const newUser = {
          name: values.name,
          email: values.email,
          password: values.password, // Make sure to hash passwords in a real app
        };

        const createUserResponse = await axios.post(
          "https://6693578bc6be000fa07af327.mockapi.io/account",
          newUser
        );
        console.log("Account created successfully:", createUserResponse.data);

        // Optionally store the user info in session storage
        sessionStorage.setItem("loginUserId", createUserResponse.data.id);

        // Redirect to homepage or another page after successful signup
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      console.log("Error creating account:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Box minW={{ base: "90%", md: "468px" }}>
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={SignupSchema}
            onSubmit={handleSignup}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack
                  spacing={4}
                  p="1.5rem"
                  backgroundColor="whiteAlpha.900"
                  boxShadow="md"
                >
                  <Heading
                    color="teal.400"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    SIGN UP
                  </Heading>

                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<CFaUserAlt color="gray.300" />}
                          />
                          <Input
                            {...field}
                            type="text"
                            placeholder="Full Name"
                          />
                        </InputGroup>
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<CFaEnvelope color="gray.300" />}
                          />
                          <Input
                            {...field}
                            type="email"
                            placeholder="Email address"
                          />
                        </InputGroup>
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            color="gray.300"
                            children={<CFaLock color="gray.300" />}
                          />
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              h="1.75rem"
                              size="sm"
                              onClick={handleShowClick}
                            >
                              {showPassword ? "Hide" : "Show"}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                    isLoading={isSubmitting}
                  >
                    Sign Up
                  </Button>

                  <Divider />

                  <Box
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Text italic color="gray.500" mb={4}>
                      Or sign up with
                    </Text>
                    <GoogleLogin
                      onSuccess={onGoogleSuccess}
                      onError={onGoogleError}
                      size="medium"
                      type="standard"
                    />
                  </Box>

                  <Box textAlign="center">
                    <Text>
                      Already have an account?{" "}
                      <Link href="/login" color="teal.500">
                        Log in
                      </Link>
                    </Text>
                  </Box>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignupPage;
