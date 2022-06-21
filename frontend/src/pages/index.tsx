import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  Container,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import EditDeletePostButtons from "../components/EditDeletePostButtons";
import { Hero } from "../components/Hero";
import Layout from "../components/Layout";
import { UpvoteSection } from "../components/UpvoteSection";
import Wrapper from "../components/Wrapper";
import { usePostsQuery } from "../generated/graphql";
import { dateTimeFormat } from "../utils/stringFormatter";

const Index: NextPage = () => {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (error) {
    return (
      <Layout>
        <Wrapper>
          <Hero title="Community Forum" />
          {error}
        </Wrapper>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>Fullstack Community Forum</title>
      </Head>

      <Layout>
        <Wrapper variant="large">
          <Hero titleSize={5} />
          <Text color="text" align={"center"} mb={10}>
            Testing out full-stack applications built with
            Express+Apollo+PostgreSQL backends and React+TS+Chakra frontends.
          </Text>
          <Container centerContent>
            <NextLink href={"/create-post"}>
              <Link as={Button} mb={10}>
                Create Post
              </Link>
            </NextLink>
          </Container>
          <Stack spacing={8}>
            {loading && !data && !error ? (
              <div>Loading...</div>
            ) : (
              data!.posts.posts.map((post) => {
                let outputString: string = dateTimeFormat(post.createdAt);
                return !post ? null : (
                  <Flex
                    key={post.id}
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                    bgColor="whiteAlpha.100"
                    borderRadius={"8px"}
                  >
                    <UpvoteSection post={post} />
                    <Box flex={1}>
                      <NextLink href="post/[id]" as={`post/${post.id}`}>
                        <Link>
                          <Heading fontSize="xl">{post.title}</Heading>
                        </Link>
                      </NextLink>
                      <Text>
                        Posted by {post.creator.username} on {outputString}
                      </Text>
                      <Flex>
                        <Text flex={1} mt={4}>
                          {post.textSnippet}
                        </Text>
                      </Flex>
                    </Box>
                    <EditDeletePostButtons
                      id={post.id}
                      creatorId={post.creator.id}
                    />
                  </Flex>
                );
              })
            )}
          </Stack>
          {data && data.posts.hasMore ? (
            <Flex>
              <Button
                m={`auto`}
                my={8}
                onClick={() => {
                  fetchMore({
                    variables: {
                      limit: variables?.limit,
                      cursor:
                        data.posts.posts[data.posts.posts.length - 1].createdAt,
                    },
                  });
                }}
              >
                Load More
              </Button>
            </Flex>
          ) : null}
        </Wrapper>
      </Layout>
    </>
  );
};

export default Index;
