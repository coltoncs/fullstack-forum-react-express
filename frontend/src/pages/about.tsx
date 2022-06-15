import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Flex,
  Text,
  Link,
  Box,
  Heading,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { Hero } from "../components/Hero";
import Layout from "../components/Layout";
import Wrapper from "../components/Wrapper";
import { withApollo } from "../utils/withApollo";
import { TbBrandNextjs } from "react-icons/tb";
import {
  SiChakraui,
  SiApollographql,
  SiExpress,
  SiPostgresql,
  SiRedis,
  SiGraphql,
} from "react-icons/si";
import styled from "@emotion/styled";
import Head from "next/head";

const FlexWrap = styled(Flex)`
  flex-direction: row;
  @screen and (max-width: 450px) {
    flex-direction: column;
  }
`;

const About: NextPage = () => {
  const { colorMode } = useColorMode();
  return (
    <>
      <Head>
        <title>About | Community Forum</title>
      </Head>
      <Layout>
        <Wrapper variant="large">
          <Hero title="About" />
          <Flex flexDir="column" gap="25px">
            <Text>
              This website was built following a full-stack course on TypeScript
              React, Express.js, GraphQL, and PostgreSQL. The frontend uses
              NextJS for server-side-rendering and client-side routing, Chakra
              UI for the styling and layout, and an Apollo React Client for
              fetching data from GraphQL. The backend is written in Express and
              uses a PostgreSQL database for the users, posts, and other
              features. TypeORM manages the database queries and GraphQL creates
              the API for Apollo on the frontend.
            </Text>
            <FlexWrap>
              <Flex
                sx={{
                  borderRadius: "8px",
                  background: colorMode === "dark" ? "white" : "gray.500",
                  boxShadow: `0 0 15px ${
                    colorMode === "dark" ? "white" : "gray"
                  }`,
                  color: colorMode === "dark" ? "black" : "white",
                  padding: "10px",
                  margin: "15px",
                }}
                w="50%"
                align="center"
                flexDir="column"
              >
                <Heading variant="h3">Frontend</Heading>
                <Box>
                  <Text>
                    <Icon as={TbBrandNextjs} mr="1" />
                    NextJS
                  </Text>
                </Box>
                <Box>
                  <Text>
                    <Icon as={SiChakraui} mr="1" />
                    Chakra UI
                  </Text>
                </Box>
                <Box>
                  <Text>
                    <Icon as={SiApollographql} mr="1" />
                    Apollo GraphQL
                  </Text>
                </Box>
              </Flex>
              <Flex
                sx={{
                  borderRadius: "8px",
                  background: colorMode === "dark" ? "white" : "gray.500",
                  boxShadow: `0 0 15px ${
                    colorMode === "dark" ? "white" : "gray"
                  }`,
                  color: colorMode === "dark" ? "black" : "white",
                  padding: "10px",
                  margin: "15px",
                }}
                w="50%"
                align="center"
                flexDir="column"
              >
                <Heading variant="h3">Backend</Heading>
                <Box>
                  <Text>
                    <Icon as={SiExpress} mr="1" />
                    ExpressJS
                  </Text>
                </Box>
                <Box>
                  <Text>
                    <Icon as={SiPostgresql} mr="1" />
                    PostgreSQL
                  </Text>
                </Box>
                <Box>
                  <Text>
                    <Icon as={SiRedis} mr="1" />
                    Redis
                  </Text>
                </Box>
                <Box>
                  <Text>
                    <Icon as={SiGraphql} mr="1" />
                    GraphQL
                  </Text>
                </Box>
              </Flex>
            </FlexWrap>
            <Text align="center">
              More information can be found{" "}
              <Link
                href="https://github.com/coltoncs/fullstack-forum-react-express"
                isExternal
              >
                here
                <ExternalLinkIcon mx="2px" />
              </Link>
            </Text>
          </Flex>
        </Wrapper>
      </Layout>
    </>
  );
};

export default withApollo({ ssr: false })(About);
