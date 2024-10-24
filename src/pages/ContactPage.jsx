// import React from "react";
// import {
//   Box,
//   Heading,
//   FormControl,
//   FormLabel,
//   Input,
//   Textarea,
//   Button,
// } from "@chakra-ui/react";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import { useDispatch } from "react-redux";
// import { submitContact } from "../redux/action";

// const ContactSchema = Yup.object().shape({
//   name: Yup.string().required("Name is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   message: Yup.string().required("Message is required"),
// });

// export default function ContactPage() {
//   const dispatch = useDispatch();

//   return (
//     <Box className="container" my={3} py={3}>
//       <Heading as="h1" textAlign="center">
//         Contact Us
//       </Heading>
//       <Box className="row" mx={40} h="100%">
//         <Box className="col-md-4 col-lg-4 col-sm-8 mx-auto">
//           <Formik
//             initialValues={{ name: "", email: "", message: "" }}
//             validationSchema={ContactSchema}
//             onSubmit={(values, actions) => {
//               console.log("Values: ", values);
//               dispatch(submitContact(values));
//               actions.resetForm();
//             }}
//           >
//             {({ errors, touched, handleSubmit }) => (
//               <Form onSubmit={handleSubmit}>
//                 <FormControl my={3}>
//                   <FormLabel htmlFor="name">Name</FormLabel>
//                   <Field
//                     as={Input}
//                     type="text"
//                     id="name"
//                     name="name"
//                     placeholder="Enter your name"
//                   />
//                   {errors.name && touched.name ? (
//                     <Box color="red">{errors.name}</Box>
//                   ) : null}
//                 </FormControl>
//                 <FormControl my={3}>
//                   <FormLabel htmlFor="email">Email</FormLabel>
//                   <Field
//                     as={Input}
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="name@example.com"
//                   />
//                   {errors.email && touched.email ? (
//                     <Box color="red">{errors.email}</Box>
//                   ) : null}
//                 </FormControl>
//                 <FormControl my={3}>
//                   <FormLabel htmlFor="message">Message</FormLabel>
//                   <Field
//                     as={Textarea}
//                     id="message"
//                     name="message"
//                     rows={5}
//                     placeholder="Enter your message"
//                   />
//                   {errors.message && touched.message ? (
//                     <Box color="red">{errors.message}</Box>
//                   ) : null}
//                 </FormControl>
//                 <Box textAlign="center">
//                   <Button
//                     my={2}
//                     px={4}
//                     colorScheme="teal"
//                     type="submit"
//                     border="none"
//                   >
//                     Send
//                   </Button>
//                 </Box>
//               </Form>
//             )}
//           </Formik>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

import React from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Checkbox,
  RadioGroup,
  Radio,
  Select,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { submitContact } from "../redux/action";

// Yup schema updated to include phone number validation
const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  message: Yup.string().required("Message is required"),
});

export default function ContactPage() {
  const dispatch = useDispatch();

  return (
    <Box className="container" my={3} py={3}>
      <Heading as="h1" textAlign="center">
        Contact Us
      </Heading>
      <Box className="row" mx={40} h="100%">
        <Box className="col-md-4 col-lg-4 col-sm-8 mx-auto">
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              message: "",
            }}
            validationSchema={ContactSchema}
            onSubmit={(values, actions) => {
              console.log("Form values: ", values); // Log the form data
              dispatch(submitContact(values)); // Dispatch the form data to Redux
              actions.resetForm(); // Reset the form after submission
            }}
          >
            {({ errors, touched, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <FormControl my={3}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Field
                    as={Input}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                  />
                  {errors.name && touched.name ? (
                    <Box color="red">{errors.name}</Box>
                  ) : null}
                </FormControl>

                <FormControl my={3}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Field
                    as={Input}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                  />
                  {errors.email && touched.email ? (
                    <Box color="red">{errors.email}</Box>
                  ) : null}
                </FormControl>

                {/* Phone Number Field */}
                <FormControl my={3}>
                  <FormLabel htmlFor="phone">Phone Number</FormLabel>
                  <Field
                    as={Input}
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && touched.phone ? (
                    <Box color="red">{errors.phone}</Box>
                  ) : null}
                </FormControl>

                <FormControl my={3}>
                  <FormLabel htmlFor="message">Message</FormLabel>
                  <Field
                    as={Textarea}
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="How can we help you?"
                  />
                  {errors.message && touched.message ? (
                    <Box color="red">{errors.message}</Box>
                  ) : null}
                </FormControl>

                <Box textAlign="center">
                  <Button
                    my={2}
                    px={4}
                    colorScheme="teal"
                    type="submit"
                    border="none"
                  >
                    Send
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}
