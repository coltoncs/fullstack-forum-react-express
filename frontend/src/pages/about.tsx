import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Flex, Text, Link } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { Hero } from "../components/Hero";
import Layout from "../components/Layout";
import Wrapper from "../components/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";

const About: NextPage = () => {
  return (
    <Layout>
      <Wrapper variant="large">
        <Hero title="About" />
        <Flex flexDir="column" gap="25px" >
          <Text>
            This website was built following a full-stack course on TypeScript
            React, Express.js, GraphQL, and PostgreSQL.
          </Text>
          <Text>
            More information can be found <Link href="https://github.com/coltoncs/fullstack-forum-react-express" isExternal>here<ExternalLinkIcon mx='2px' /></Link>
          </Text>
        </Flex>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(About);
