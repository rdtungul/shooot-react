import { VStack, Heading, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import documents inside the db
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";
// importing footer section
import Footer from "../components/Footer";

export default function Home({ isAuth }) {
  // setting up the list of posts inside the firebase db
  const [postLists, setPostLists] = useState([]);
  // creating a variable for the firestore collection "posts"
  const postsCollectionRef = collection(db, "posts");

  // calling the firebase to retrieve the info in the db
  useEffect(() => {
    const getPosts = async () => {
      // contain the info about the list inside db
      const data = await getDocs(postsCollectionRef);
      // retrieved data in firebase db
      setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    // function invocation
    getPosts();
  }, []);

  const [isAuth2, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <div className="homepage">
      {!isAuth2 ? (
        <div className="homepage--container">
          <div className="homepage--home">
            <Heading as="h1">Shooot your shot now!</Heading>
            <Text>Connect and make a post to the world.</Text>
            <Link className="homepage--login" to="/login">
              Get started
            </Link>
          </div>
          <VStack>
            {postLists.map((post) => {
              return (
                <Box className="post--container" key={post.id}>
                  <Box className="author-post">
                    <Text className="author-text">{post.author.dateTime}</Text>
                  </Box>
                  <Heading as="h3">{post.title}</Heading>
                  <Text>{post.postText}</Text>
                  <label>{post.displayUserName}</label>
                  <label>~ {post.author.displayUserName}</label>
                </Box>
              );
            })}
          </VStack>
          <Footer />
        </div>
      ) : (
        <div>
          <Heading as="h1" py={50} setIsAuth={setIsAuth}>
            All posts
          </Heading>
          <VStack>
            {postLists.map((post) => {
              return (
                <Box className="post--container" key={post.id}>
                  <Box className="author-post">
                    <Text className="author-text">{post.author.dateTime}</Text>
                  </Box>
                  <Heading as="h3">{post.title}</Heading>
                  <Text>{post.postText}</Text>
                  <label>{post.displayUserName}</label>
                  <label>~ {post.author.displayUserName}</label>
                </Box>
              );
            })}
          </VStack>
        </div>
      )}
    </div>
  );
}
