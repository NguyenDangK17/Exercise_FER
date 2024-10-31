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
import { FaUserAlt, FaLock } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loginError } = useAuth(); // Access login and loginError from AuthContext

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleLogin = async (values, { setSubmitting }) => {
    const result = await login(values);
    if (result.success) {
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
    setSubmitting(false);
  };

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
              avatar: decoded.picture,
              role: "user",
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
            sessionStorage.setItem("loginUserId", decoded.name);
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
    console.log("Failed to login with Google: ", err.message);
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
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin} // Use AuthContext's login function here
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
                    LOGIN
                  </Heading>

                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<CFaUserAlt color="gray.300" />}
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

                  {loginError && (
                    <Text color="red.500" textAlign="center">
                      {loginError}
                    </Text>
                  )}

                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                    isLoading={isSubmitting}
                  >
                    Login
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
                      Or log in with
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
                      Don't have an account?{" "}
                      <Link href="/signup" color="teal.500">
                        Sign up
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

export default LoginPage;
