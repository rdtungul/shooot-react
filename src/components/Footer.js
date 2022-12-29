import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const Footer = () => {
  // getting automatic full year integration
  const year = new Date().getFullYear();

  return (
    <Box backgroundColor="rgba(0, 0, 0, 0.75)">
      <footer>
        <Flex
          margin="0 auto"
          //   px={12}
          color="white"
          justifyContent="center"
          alignItems="center"
          maxWidth="1024px"
          height={100}
        >
          <p>
            {" "}
            © {year}
            <a
              href="https://rdtungul.github.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              rosephdarl
            </a>
            - Instructor/ Web Developer. Made with ❤ & ☕.
          </p>
        </Flex>
      </footer>
    </Box>
  );
};
export default Footer;
