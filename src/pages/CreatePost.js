import { useEffect, useState } from "react";

import { VStack, HStack, Heading, Box } from "@chakra-ui/react";
import { async } from "@firebase/util";
// importing addDoc from firestore under firebase package
import { addDoc, collection } from "firebase/firestore";
// importing db from the firebase-config file
import { db, auth } from "../firebase-config";
// importing the useNavigate hook for accessing the site route using react-router-dom
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function CreatePost({ isAuth }) {
  // setting up the usState for the title
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  // creating a variable for the firestore collection "posts"
  const postsCollectionRef = collection(db, "posts");
  // adding navigation route
  let navigate = useNavigate();
  // submit the data from firebase "firestore"
  const createPost = async () => {
    // adding date and time logged

    var date = moment().format("LL");
    console.log(date);

    // adding document to the firebase table "posts"
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
        dateTime: date,
        displayUserName: "Anonymous",
      },
    });
    // navigation link to homepage after creating post
    navigate("/");
  };

  useEffect(() => {
    // authentication validation for login user
    if (!isAuth) {
      // if the user is not logged in it will navigate to the login page
      navigate("/login");
    }
  });

  return (
    <div className="create-post-page">
      <div className="cp--container">
        <Heading as="h1">Create a post</Heading>
        <Box p={6} rounded="md" w="100%">
          <VStack spacing={4}>
            <HStack>
              <input
                required
                className="cp--text-title"
                placeholder="Enter title..."
                id="title"
                name="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </HStack>

            <HStack>
              <textarea
                required
                className="cp--text-content"
                placeholder="Create posts..."
                id="post"
                name="post"
                onChange={(e) => {
                  setPostText(e.target.value);
                }}
              />
            </HStack>

            <button
              className="cp--button"
              onClick={createPost}
              type="submit"
              colorScheme="purple"
              width="full"
            >
              Submit
            </button>
          </VStack>
        </Box>
      </div>
    </div>
  );
}
