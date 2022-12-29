import { VStack, Heading, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import documents inside the db
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

export default function Home({ isAuth }) {
  // deleting posts function
  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    // specifying the location of the post for delete
    await deleteDoc(postDoc);
    window.location.reload();
  };
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
  }, [deletePost]);

  const [isAuth2, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <div>
      <VStack>
        {!isAuth2 ? (
          <div>
            <Heading>Welcome to RD Blogpost!</Heading>
            <Text>Please login to read and post your blog.</Text>
          </div>
        ) : (
          <Heading as="h1" py={50} setIsAuth={setIsAuth}>
            All posts
          </Heading>
        )}
        {postLists.map((post) => {
          return (
            <Box className="post--container" key={post.id}>
              <Box className="delete-post">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                    className="delete-btn"
                  >
                    &#128465;
                  </button>
                )}
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
  );
}
