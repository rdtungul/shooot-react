import { useEffect, useState } from "react";
import { useFormik } from "formik";
import useSubmit from "../hooks/useSubmit";
import * as Yup from "yup";
import {
  VStack,
  HStack,
  Heading,
  Text,
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { async } from "@firebase/util";
// importing addDoc from firestore under firebase package
import { addDoc, collection } from "firebase/firestore";
// importing db from the firebase-config file
import { db, auth } from "../firebase-config";
// importing the useNavigate hook for accessing the site route using react-router-dom
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  // setting up the usState for the title
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  // creating a variable for the firestore collection "posts"
  const postsCollectionRef = collection(db, "posts");
  // adding navigation route
  let navigate = useNavigate();
  // submit the data from firebase "firestore"
  const createPost = async () => {
    // adding document to the firebase table "posts"
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { name: auth.displayName, id: auth.currentUser.uid },
    });
    // navigation link to homepage after creating post
    navigate("/");
  };

  // configuration for the validation form
  const { response, submit } = useSubmit();
  const formik = useFormik({
    initialValues: {
      title: "",
      post: "",
    },
    onSubmit: (values) => {
      submit("https://john.com/contactme", values);
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please enter your title."),
      post: Yup.string()
        .min(25, "Must be at least 25 characters")
        .required("Please input your post."),
    }),
  });
  useEffect(() => {
    if (response) {
      if (response.type === "success") {
        formik.resetForm();
      }
    }
  }, [response]);
  return (
    <div className="create-post-page">
      <div className="cp--container">
        <Heading as="h1">Create a post</Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit} onClick={createPost}>
            <VStack spacing={4}>
              <FormControl
                isInvalid={!!formik.errors.title && formik.touched.title}
              >
                <HStack>
                  <FormLabel htmlFor="title">Title: </FormLabel>
                  <Input
                    id="title"
                    name="title"
                    {...formik.getFieldProps("title")}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </HStack>
                <FormErrorMessage className="error-msg">
                  {formik.errors.title}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!formik.errors.post && formik.touched.post}
              >
                <HStack>
                  <FormLabel htmlFor="post">Post: </FormLabel>
                  <Textarea
                    id="post"
                    name="post"
                    {...formik.getFieldProps("post")}
                    onChange={(e) => {
                      setPostText(e.target.value);
                    }}
                  />
                </HStack>
                <FormErrorMessage className="error-msg">
                  {formik.errors.post}
                </FormErrorMessage>
              </FormControl>

              <Button type="submit" colorScheme="purple" width="full">
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </div>
    </div>
  );
}
